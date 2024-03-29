<?php

class DB
{
    private $pdo;

    public function __construct()
    {
//----------------------------------------------------------------------------//
//
//        $host = $_ENV['HOST_PROD'];
//        $port = $_ENV['PORT_PROD'];
//        $user = $_ENV['USER_PROD'];
//        $pass = $_ENV['PASS_PROD'];
//        $db = $_ENV['DB_PROD'];
//----------------------------------------------------------------------------//
//
        $host = $_ENV['HOST_LC1']; // LOCAL Для Трусова
        $port = $_ENV['PORT_LC1'];
        $user = $_ENV['USER_LC1'];
        $pass = $_ENV['PASS_LC1'];
        $db =   $_ENV['DB_LC1'];
//
//----------------------------------------------------------------------------//
//
//        $host = $_ENV['HOST_LC2']; // LOCAL на MAMP
//        $port = $_ENV['PORT_LC2'];
//        $user = $_ENV['USER_LC2'];
//        $pass = $_ENV['PASS_LC2'];
//        $db = $_ENV['DB_LC2'];

        $connect = "mysql:host=$host;port=$port;dbname=$db;charset=utf8";
        $this->pdo = new PDO($connect, $user, $pass);
    }

    public function __destruct()
    {
        $this->pdo = null;
    }

    // выполнить запрос без возвращения данных
    private function execute($sql, $params = [])
    {
        $sth = $this->pdo->prepare($sql);
//        var_dump($sth);
        return $sth->execute($params);
    }

    // получение ОДНОЙ записи
    private function query($sql, $params = [])
    {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetch(PDO::FETCH_OBJ);
    }

    // получение НЕСКОЛЬКИХ записей
    private function queryAll($sql, $params = [])
    {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
//        var_dump($sth, $params);
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }


//    НЕПОВТОРИМЫЙ ОРИГИНАЛ

    public function getUserByLogin($login)
    {
        return $this->query("SELECT * FROM users WHERE login=?", [$login]);
    }

    public function getUserByToken($token)
    {
        return $this->query("SELECT * FROM users WHERE token=?", [$token]);
    }

    public function getUserByEmail($email)
    {
        return $this->query("SELECT * FROM users WHERE email=?", [$email]);
    }

    public function getUserById($id)
    {
        return $this->query("SELECT * FROM users WHERE id=?", [$id]);
    }


    public function getUserByUuid($uuid)
    {
        return $this->query("SELECT * FROM users WHERE uuid=?", [$uuid]);
    }


    public function updateToken($id, $token)
    {
        $this->execute("UPDATE users SET token=? WHERE id=?", [$token, $id]);
    }

    public function addUser($login, $hash, $name, $email, $uuid)
    {
        $this->execute(
            "INSERT INTO users (login,password,name,email, uuid) VALUES (?, ?, ?, ?, ?)",
            [$login, $hash, $name, $email, $uuid]
        );
    }

    public function getInfoMatch()
    {
        return $this->query("SELECT match_time_start, match_time_end, match_status FROM `game` WHERE id=1");
    }

    public function startMatch($timeStart, $timeEnd)
    {
        $this->execute("UPDATE `game` SET match_time_start = ?, match_time_end =?, match_status = ? WHERE id = 1
", [$timeStart, $timeEnd, "playing"]);
    }


    public function endMatch()
    {
        $this->execute("UPDATE `game` SET match_status =DEFAULT;
                            UPDATE players SET status='WaitToSpawn', skin_id = DEFAULT, 
                                               dx = DEFAULT, dy=DEFAULT, hp = DEFAULT, kills =DEFAULT, deaths = DEFAULT;
                            DELETE FROM bullets;
                            UPDATE 'teams' SET team_score = 0
                            
");
    }


    public function setPassword($id, $password)
    {
        $this->execute("UPDATE users SET password =? WHERE id = ?", [$password, $id]);
    }

    public function getMessage()
    {
        return $this->queryAll("SELECT u.name AS name, m.message AS message,
       DATE_FORMAT(m.created,'%H:%i') AS created FROM messages as m LEFT JOIN 
    users as u on u.id = m.user_id 
                              ORDER BY m.created DESC LIMIT 10");
    }

    public function sendMessage($id, $message)
    {
        $this->execute('INSERT INTO messages (user_id, message, created)
VALUES (?,?, now())', [$id, $message]);
    }


    public function getBullets()
    {
        return $this->queryAll("
                SELECT id, status, user_id ,
                x, y, vx, vy FROM bullets");
    }

    public function setBullet($userId, $x, $y, $vx, $vy)
    {

        $this->execute("INSERT INTO bullets (bullets.user_id,x,y,vx,vy) VALUES (?,?,?,?,?)",
            [$userId, $x, $y, $vx, $vy]);
    }

    public function updateBullets($strokeX, $strokeY, $id)
    {
        $ids = implode(',', $id);
        $stroke = "UPDATE bullets SET px = x,
                   x = CASE id 
                       {$strokeX}
                   ELSE x 
            END,
                   py = y,
                    y = CASE id 
               {$strokeY}
                   ELSE y
            END
                   WHERE id IN ($ids);

";
        $this->execute($stroke);
    }


    public function setStatusOfdeleteBullets($stroke, $id)
    {
        $ids = implode(',', $id);
        $stroke = "UPDATE bullets SET status = CASE id {$stroke}
                   ELSE status 
            END
                   WHERE id IN ($ids);

";
        $this->execute($stroke);
    }

    public function deleteBullets()
    {
        $this->execute("DELETE FROM bullets
WHERE status =? ", ["Delete"]);
    }


    public function updateScoreInTeam($scoreA, $scoreB)
    {

        $this->execute("UPDATE teams
        SET team_score = 
        CASE 
            WHEN team_id = ? THEN team_score + ?
            WHEN team_id = ? THEN team_score + ?
        END
        WHERE team_id IN (?, ?);",
            [0, $scoreA, 1, $scoreB, 0, 1]);

    }

    public function addPlayer($id, $teamId)
    {
        $status = 'WaitToSpawn';
        $this->execute(
            "INSERT INTO players (user_id, team_id, status)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE team_id = VALUES(team_id), status = VALUES(status);",
            [$id, $teamId, $status]);
    }


    public function deletePlayer($token)
    {
        $this->execute("DELETE FROM players
WHERE user_id = (SELECT id FROM users WHERE token = ?)", [$token]);
    }

//    public function getSkinsInLobby() // переписать
//    {
//        return $this->queryAll("SELECT userSkins.skin_id as id, skins.text, 
//       skins.image FROM userSkins INNER JOIN skins ON userSkins.skin_id = skins.id 
//                   WHERE skins.role='lobby'");
//    }
//
//    public function setSkinInLobby($id, $skinId) // переписать
//    {
//        $this->execute("UPDATE userSkins SET skin_id=? WHERE  id=?", [$skinId, $id]);
//    }


    public function getPlayers()
    {
        return $this->queryAll("SELECT u.token as token, u.name as name, p.score as score, p.status as status, p.hp as hp, p.team_id as teamId, p.deaths as deaths, p.skin_id, p.x, p.y, p.vx, p.vy, p.dx, p.dy
FROM players as p INNER JOIN users as u on u.id=p.user_id");
    }

    public function getAllInfoPlayers()
    {
        return $this->queryAll("SELECT * from players");
    }

    public function setPlayer($id, $x, $y, $vx, $vy, $dx, $dy)
    {
        $this->execute("UPDATE players  SET x = ?, y= ?, vx= ?, vy= ?, dx= ?, dy= ? WHERE user_id = ?",
            [$x, $y, $vx, $vy, $dx, $dy, $id]);
    }

    public function setStatus($id, $status)
    {
        $this->execute("UPDATE players SET status = ? WHERE user_id = ?", [$status, $id]);
    }

    public function addUserStats($user_id, $kills, $death, $time_in_game, $points)
    {
        $this->execute("INSERT INTO stats (user_id, kills, deaths, time_in_game, points)
        VALUES (?, 0, 0, 0, 0) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), kills = VALUES(kills), deaths = VALUES(deaths), 
      time_in_game = VALUES(time_in_game), points = VALUES(points);
", [$user_id, $kills, $death, $time_in_game, $points]);
    }


    public function getObjects()
    {
        return $this->queryAll("SELECT id, state FROM objects");
    }

    public function getObjectById($id)
    {
        return $this->query("SELECT * FROM objects WHERE id=?", [$id]);
    }


    public function setDestroyObject($objectId, $state)
    {
        $this->execute("UPDATE objects SET state=? WHERE id=?", [$state, $objectId]);
    }

    public function spawnPlayer($userId, $x, $y)
    {
        $this->execute("UPDATE players SET x=?, y=?, hp = 100 WHERE user_id=?", [$x, $y, $userId]);
    }

    public function getHashes()
    {
        return $this->query("SELECT * FROM game WHERE id=1");
    }

    public function updateChatHash($hash)
    {
        $this->execute("UPDATE game SET chat_hash=? WHERE id=1", [$hash]);
    }

    public function updatePlayersHash($hash)
    {
        $this->execute("UPDATE game SET players_hash=? WHERE id=1", [$hash]);
    }

    public function updateBulletsHash($hash)
    {
        $this->execute("UPDATE game SET bullets_hash=? WHERE id=1", [$hash]);
    }

    public function updateObjectsHash($hash)
    {
        $this->execute("UPDATE game SET objects_hash=? WHERE id=1", [$hash]);
    }

    public function updateAllGameHashes($playersHash, $objectsHash, $bulletsHash)
    {
        $this->execute("UPDATE game SET players_hash = ?, objects_hash = ?, bullets_hash = ? WHERE id = 1", [$playersHash, $objectsHash, $bulletsHash]);
    }

    public function updateTimestamp($timestamp)
    {
        $this->execute("UPDATE game SET update_timestamp=? WHERE id=1", [$timestamp]);
    }


    public function decreaseHp($strokeDHp, $id)
    {

        $ids = implode(',', $id);
        $stroke = "UPDATE players SET hp = CASE user_id {$strokeDHp}
                   ELSE hp 
            END
                   WHERE user_id IN ($ids);

";
        $this->execute($stroke);
    }

    public function setDeath($strokeSetDeath, $id)
    {
        $ids = implode(',', $id);
        $stroke = "UPDATE players SET hp = 0, deaths = deaths+1, status = CASE user_id {$strokeSetDeath}
                   ELSE status
            END
                   WHERE user_id IN ($ids);

";
        $this->execute($stroke);
    }

    public function addInfoAboutKills($sqlSetKillerToVictim, $deathPlayersId)
    {
        $deathPlayersIds = implode(',', $deathPlayersId);
        $sql = "UPDATE players 
        SET 
            killer_id = CASE user_id
                            $sqlSetKillerToVictim
                        END
                WHERE user_id IN ($deathPlayersIds); ";
        $this->execute($sql);
    }

    public function updateScoreTeams($scoreA, $scoreB)
    {
        $this->execute("UPDATE teams
        SET team_score = 
        CASE 
            WHEN team_id = ? THEN team_score + ?
            WHEN team_id = ? THEN team_score + ?
        END
        WHERE team_id IN (?, ?);",
            [0, $scoreA, 1, $scoreB, 0, 1]);
    }

    public function getStats($userId)
    {
        return $this->query("SELECT 
             SUM(deaths) AS deaths,
             SUM(kills) AS kills,
             SUM(points) AS points
             FROM stats
             WHERE user_id = ?", [$userId]);
    }


    public function getTeamsInfo()
    {
        return $this->queryAll("SELECT * FROM teams");


    }

    public function addKillsToKiller($sqlAddKillsToKiller, $killersId)
    {
        $ids = implode(',', $killersId);
        $sql = "UPDATE players 
        SET 
            kills = CASE user_id 
                $sqlAddKillsToKiller
                        
                        END
                WHERE user_id IN ($killersId)";
        $this->execute($sql);
    }
}

