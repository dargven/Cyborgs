<?php

class DB
{
    //сохраняет соединение с ДБ
    private $pdo;

    //вызов соединения с БД
    public function __construct()
    {

        // local
//        $host = '127.0.0.1';
//        $port = 3306;
//        $user = 'root';
//        $pass = '';
//        $db = 'cyborgs';

        $host = 'dargvetg.beget.tech';
        $port = '3306';
        $user = 'dargvetg_cyborgs';
        $pass = 'vizual22cdxsaV';
        $db = 'dargvetg_cyborgs';

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

    public function getUserById($id)
    {
        return $this->query("SELECT * FROM users WHERE id=?", [$id]);
    }

    public function updateToken($id, $token)
    {
        return $this->execute("UPDATE users SET token=? WHERE id=?", [$token, $id]);
    }

    public function addUser($login, $password)
    {
        $this->execute(
            "INSERT INTO users (login,password) VALUES (?, ?)",
            [$login, $password]
        );
    }




    public function addPlayerToTeam($id, $teamId)
    {
        return $this->execute("INSERT INTO userTeams (team_id, user_id) VALUES (?, ?)", [$teamId, $id]);
    }

    public function sendMessage($id, $message)
    {
        return $this->execute('INSERT INTO messages (user_id, message, created) VALUES (?,?, now())', [$id, $message]);
    }

    public function getMessage()
    {
        return $this->queryAll('SELECT name, message, created FROM messages as m LEFT JOIN users as u on u.id = m.user_id ORDER BY m.created DESC');
    }


    public function addBullet($user_id, $x, $y, $x1, $y1, $speed)
    {
        return $this->execute("INSERT INTO bullet (user_id, x, y, x1, y1, speed)
        VALUES (?,?,?,?,?,?)", [$user_id, $x, $y, $x1, $y1, $speed]);
    }

    public function DeleteBullet($id)
    {
        return $this->execute("DELETE  FROM bullet WHERE id=?", [$id]);
    }

    public function updateScoreInTeam($teamId,$score)
    {
        
        return $this->execute("UPDATE teams SET team_score=team_score+? WHERE  team_id=?", [$score, $teamId]);
        
    }




    public function setSkinInLobby($id, $skinId)
    {
        return $this->execute("UPDATE userSkins SET skin_id=? WHERE  id=?", [$skinId, $id]);
    }
    // ЖАЛКАЯ ПАРОДИЯ //
    //Методы полностью переписаны по феншую, осталось их нормально протестить.

    


    public function getScoreTeams()
    {
        return $this->execute("SELECT team_id, team_score FROM teams group by team_id");
    }

    public function getCountOfPlayersInTeams()
    {
        return $this->queryAll("SELECT team_id, COUNT(user_id) as countOfPlayers from userTeams group by team_id");

    }



   

    public function getSkinsInLobby()
    {
        return $this->queryAll("SELECT skin_id as id, text, image FROM userSkins, skins WHERE`role`='lobby'");
    }

   

   


}

