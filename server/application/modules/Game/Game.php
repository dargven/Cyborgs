<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
require_once __DIR__ . '/SpawnPoints/SpawnPoints.php';
require_once __DIR__ . '/CollidersPositions/CollidersPositions.php';

class Game
{
    private DB $db;
    private array $teamASpawnPoints;
    private array $teamBSpawnPoints;
    private array $colliders;

    public function __construct($db)
    {
        $this->db = $db;
        $this->teamASpawnPoints = SpawnPoints::$spawnPoints[0];
        $this->teamBSpawnPoints = SpawnPoints::$spawnPoints[1];
        $this->colliders = CollidersPositions::$collidersPositions;
    }

    private function genHash()
    {
        return md5(rand(0, 1000000));
    }


    private function updateScene($timeout, $timestamp)
    {

        $time = time() * 1000 - intval($timestamp);
        if ($time >= $timeout) {
            $this->db->updateTimestamp(time() * 1000);
            $this->spawnPlayers();
            $this->deleteBullets();
            $bullets = $this->db->getBullets();
            $this->checkHit($bullets);
            $this->moveBullet($bullets);
            $this->match();


////            // пробежаться по всем игрокам
////            // если игрок умер, то удалить его из игроков и добавить запись "трупик" в предметы // или поменять статус на мертв
////
////            // пробежаться по всем пулям
////            // если у пули статус "куда-то попала" - удалить её
////
////            // пробежаться по всем игрокам
////            // если пуля убила игрока, то поменять его статус на "умер"
////            // поменять статус пули на "куда-то попала"
////            // записать запись об убийстве игрока в stats
////            // игроку-убийце посчитать количество его убийств и обновить поле kills в таблице players
////            //$players = $this->getPlayers();
////            //$bullets = $this->getBullets();
            return true;
        }
        return false;
    }

    public function moveBullet($bullets) //для передвежения пуль на сцены
    {
        foreach ($bullets as &$bullet) {
            $bullet['x'] = $bullet['x'] + $bullet['vx'] / 10;
            $bullet['y'] = $bullet['y'] + $bullet['vy'] / 10;
        }
        unset($bullet);
        //////
        $sqlStrokeX = "";
        $sqlStrokeY = "";
        $arrayOfBId = [];
        for ($i = 0; $i < count($bullets); $i++) {
            if ($bullets[$i]['status'] == 'Shoot') {
                $id = $bullets[$i]['id'];
                $x = $bullets[$i]['x'];
                $y = $bullets[$i]['y'];
                $sqlStrokeX .= "WHEN {$id} THEN {$x} ";
                $sqlStrokeY .= "WHEN {$id} THEN {$y} ";
                $arrayOfBId[] = $id;

            }
        }
        if ($sqlStrokeX) {
            $this->db->updateBullets($sqlStrokeX, $sqlStrokeY, $arrayOfBId);
        }

    }

    private function deleteBullets()
    {
        $this->db->deleteBullets();
    }

    private function checkHit($bullets)
    {
        $colliders = $this->colliders;
        $bulletsToDelete = [];
        $players = $this->db->getAllInfoPlayers();
        $playersHit = [];
        $playersHitByBullet = [];

        foreach ($bullets as $bullet) {
            if ($bullet['status'] == 'Shoot') {
                foreach ($players as $player) {
                    if ((($bullet['x'] - $player['x']) ** 2 + ($bullet['y'] - $player['y']) ** 2) <= 1) {
                        $bulletsToDelete[] = $bullet;
                        $playersHit[] = $player;
                        $playersHitByBullet[] = [
                            $player['user_id'] => $bullet['user_id']
                        ];
                        continue;
                    }
                    if (!(in_array($bullet['id'], $bulletsToDelete))) {
                        foreach ($colliders as $collider) {
                            if ($bullet['x'] >= $collider['x'] && $bullet['x'] <= ($collider['x'] + $collider['width']) &&
                                $bullet['y'] <= $collider['y'] && $bullet['y'] >= ($collider['y'] - $collider['height'])) {
                                $bulletsToDelete[] = $bullet;
                                break;
                            }
                        }

                    }
                }

            }
        }
        if ($playersHit) {
            $this->setHit($playersHit,$playersHitByBullet);
        }
        if ($bulletsToDelete) {
            $this->setStatusBulletToDelete($bulletsToDelete);
        }
    }

    private function setStatusBulletToDelete($bulletsToDelete)
    {
        $sqlStroke = '';
        $arrayOfBId = [];
        foreach ($bulletsToDelete as $bullet) {
            $id = $bullet['id'];
            $status = "Delete";
            $sqlStroke .= "WHEN {$id} THEN '{$status}' ";
            $arrayOfBId[] = $id;
        }
        $this->db->setStatusOfdeleteBullets($sqlStroke, $arrayOfBId);


    }


    private function setHit($playersHit, $playersHitByBullet)
    {
        $this->decreaseHp($playersHit, $playersHitByBullet);
    }

    private function decreaseHp($playersHit, $playersHitByBullet)
    {
        $dHp = 20;
        $decreaseHpPlayersId = [];
        $deathPlayers = [];
        $deathPlayersId = [];
        $sqlStrokeDHp = '';
        $sqlStrokeSetDeath = '';
        //
        $killsCounterPlayers = [];
        $sqlSetKillerToVictim = '';
        $sqlAddKillsToKiller = '';
        //
        $killersId = [];
        foreach ($playersHit as $player) {
            $pHp = $player['hp'];
            $id = $player['user_id'];
            if ($pHp - $dHp > 0) {
                $sqlStrokeDHp .= "WHEN {$id} THEN hp-20 ";
                $decreaseHpPlayersId[] = $player['user_id'];
                } 
            else if ($pHp - $dHp <= 0 || $player['hp'] == 0) {
                $status = "Death";
                $sqlStrokeSetDeath .= "WHEN {$id} THEN '$status' ";
                $deathPlayers[] = $player;
                $deathPlayersId[] = $player['user_id'];
                //
                $killerId = $playersHitByBullet[$id];
                $killsCounterPlayers[$killerId] += 1;
                //
                
            }
        }
        
        if ($sqlStrokeDHp) {
            $this->db->decreaseHp($sqlStrokeDHp, $decreaseHpPlayersId);
        }
        if ($sqlStrokeSetDeath) {
            $this->setDeath($sqlStrokeSetDeath, $deathPlayersId, $deathPlayers);
            //
            foreach ($playersHitByBullet as $killerPlayerId){
                $victimId = array_search($killerPlayerId, $playersHitByBullet); // Victim == user_id;
                $sqlSetKillerToVictim .= "WHEN $victimId THEN $killerPlayerId";
                $sqlAddKillsToKiller .= "WHEN {$killerPlayerId} THEN kills '+' {$killsCounterPlayers[$killerPlayerId]}";
                $killersId[] = $killerPlayerId;
            }
        }
        if($sqlSetKillerToVictim){
            $this->db->addInfoAboutKills($sqlSetKillerToVictim,$sqlAddKillsToKiller, $deathPlayersId,$killersId);
        }

    }

    private function setDeath($sqlStrokeSetDeath, $deathPlayersId, $deathPlayers)
    {
        $this->db->setDeath($sqlStrokeSetDeath, $deathPlayersId);
        $this->updateTeamsScore($deathPlayers);

    }

    private function updateTeamsScore($deathPlayers)
    {
        $scoreA = 0;
        $scoreB = 0;
        foreach ($deathPlayers as $player) {
            if ($player['teamId'] == 0) {
                $scoreA += 1;
            } else if ($player['teamId'] == 1) {
                $scoreB += 1;
            }
        }

        $this->db->updateScoreInTeam($scoreA, $scoreB);
    }


    private function checkTeamDamage()
    {
        //нужно брать все пули которые попали брать тим id в кого они попали по пуле смотреть тим ID кто стрелял
        //если оно одинаковое то заносить их в $_SESSION
        //создать еще 1 функцию -рейтинг если он попал больше 4 раз за матч по своим снимать рейтинг из писка мерки
    }


    private function spawnPlayers()
    {
        $players = $this->db->getAllInfoPlayers();
        $usedSpawnPoints = [];
        foreach ($players as $player) {
            if ($player['status'] == 'WaitToSpawn') {
                if ($player['team_id'] == 0) {
                    $spawnPoint = $this->getFreeSpawnPoint($player['x'], $player['y'], $this->teamASpawnPoints, $usedSpawnPoints);
                    if ($spawnPoint !== null) {
                        $this->db->spawnPlayer($player['user_id'], $spawnPoint['x'], $spawnPoint['y']);
                        $this->db->setStatus($player['user_id'], 'Live');
                        $usedSpawnPoints[] = $spawnPoint;
                    }
                } else if ($player['team_id'] == 1) {
                    $spawnPoint = $this->getFreeSpawnPoint($player['x'], $player['y'], $this->teamBSpawnPoints, $usedSpawnPoints);
                    if ($spawnPoint !== null) {
                        $this->db->spawnPlayer($player['user_id'], $spawnPoint['x'], $spawnPoint['y']);
                        $this->db->setStatus($player['user_id'], 'Live');
                        $usedSpawnPoints[] = $spawnPoint;
                    }
                }
            } else if ($player['status'] == 'Death') {
                if ($player['team_id'] == 0) {
                    $spawnPoint = $this->teamASpawnPoints[array_rand($this->teamASpawnPoints)];
                    $this->db->spawnPlayer($player['user_id'], $spawnPoint['x'], $spawnPoint['y']);
                    $this->db->setStatus($player['user_id'], 'Live');

                } else if ($player['team_id'] == 1) {
                    $spawnPoint = $this->teamBSpawnPoints[array_rand($this->teamBSpawnPoints)];
                    $this->db->spawnPlayer($player['user_id'], $spawnPoint['x'], $spawnPoint['y']);
                    $this->db->setStatus($player['user_id'], 'Live');
                }
            }
        }


    }

    private function getFreeSpawnPoint($playerX, $playerY, $spawnPoints, $usedSpawnPoints)
    {
        foreach ($spawnPoints as $spawnPoint) {
            if (!in_array($spawnPoint, $usedSpawnPoints)) {//&& $this->checkFreePosition($playerX, $playerY, $spawnPoint['x'], $spawnPoint['y'])) {
                return $spawnPoint;
            }
        }
        return null;
    }


    private function getBullets()
    {
        return $this->db->getBullets();
    }

    public function getObjects()
    {
        return $this->db->getObjects();
    }

    public function getPlayers()
    {
        return $this->db->getPlayers();
    }

    public function shoot($userId, $x, $y, $vx, $vy)
    {
        $this->db->setBullet($userId, $x, $y, $vx, $vy);
        $hash = $this->genHash();
        $this->db->updateBulletsHash($hash);
        return true;
    }

    public function getScene($playersHash, $objectsHash, $bulletsHash)
    {
        $hashes = $this->db->getHashes();
        if ($this->updateScene($hashes->update_timeout, $hashes->update_timestamp)) {
            $playersHash = $this->genHash();
            $bulletsHash = $this->genHash();
            $objectsHash = $this->genHash();
            $this->db->updateAllGameHashes($playersHash, $bulletsHash, $objectsHash);
        }
        $scene = [
            'hashes' =>
                [
                    'playersHash' => NULL,
                    'objectsHash' => NULL,
                    'bulletsHash' => NULL
                ],
            'scene' => [
                'players' => NULL,
                'bullets' => NULL,
                'objects' => NULL,
            ],
            'match' => [
                'matchStart' => NULL,
                'matchEnd' => NULL,
                'matchStatus'=> 'playing'
            ],
        ];
        if ($hashes->players_hash !== $playersHash) {
            $players = $this->getPlayers();
            $scene['scene']['players'] = $players;
            $scene['hashes']['playersHash'] = $hashes->players_hash;
        }
        if ($hashes->objects_hash !== $objectsHash) {
            $objects = $this->getObjects();
            $scene['scene']['objects'] = $objects;
            $scene['hashes']['objectsHash'] = $hashes->objects_hash;
        }
        if ($hashes->bullets_hash !== $bulletsHash) {
            $bullets = $this->getBullets();
            $scene['scene']['bullets'] = $bullets;
            $scene['hashes']['bulletsHash'] = $hashes->bullets_hash;
        }
//        if () {
//
//        }
        return $scene;
    }

    public function match()
    {
        $matchInfo = $this->db->getInfoMatch();
        $timeEnd = $matchInfo->match_time_end;
        $time = time() * 1000;
        if ($time >= $timeEnd || $time + 100 >= $timeEnd) {
            $this->endMatch();
        }
        else if($matchInfo->match_status == "notPlaying"){
            $this->startMatch(); 
        }
    }

    public function startMatch()
    {
        $timeStart = time() * 1000;
        $timeEnd = $timeStart + 180000;
        $this->db->startMatch($timeStart, $timeEnd);
    }


    private function endMatch()
    {
        $matchInfo = $this->db->getInfoMatch();
        sleep(15);
        $this->db->endMatch();
        $this->startMatch();
    }
       


    public function setPlayer($id, $x, $y, $vx, $vy, $dx, $dy)
    {
        $this->db->setPlayer($id, $x, $y, $vx, $vy, $dx, $dy);
        $hash = $this->genHash();
        $this->db->updatePlayersHash($hash);
        return true;
    }

    public function setDestroyObject($objectId, $state)
    {
        $object = $this->db->getObjectById($objectId);
        if ($object) {
            if ($state === 0 || $state === 1) {
                $this->db->setDestroyObject($objectId, $state);
                $hash = $this->genHash();
                $this->db->updateObjectsHash($hash);
                return true;
            }
            return ['error' => 801];
        }
        return ['error' => 800];
    }


}
