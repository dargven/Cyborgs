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
            $this->moveBullet();


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

    private function moveBullet() //для передвежения пуль на сцены
    {
        $bullets = $this->db->getBullets();
        foreach ($bullets as &$bullet) {
            $bullet['x'] = $bullet['x'] + $bullet['vx'];
            $bullet['y'] = $bullet['y'] + $bullet['vy'];
        }
        unset($bullet);
        foreach ($bullets as $bullet) {
            $this->db->updateBullets($bullet);
        }
        $this->checkHit($bullets);

    }

    private function checkHit($bullets)
    {
        $colliders = $this->colliders;
        $bulletsToDelete = [];
        $players = $this->db->getAllInfoPlayers();
        $PlayersHit = [];

        foreach ($bullets as $bullet) {
            if ($bullet['status'] == 'Shoot') {
                foreach ($players as $player) {
                    if ((sqrt(($bullet['x'] ** 2) + ($bullet['y'] ** 2))) <= ((sqrt(($player['x'] ** 2) + ($player['y'] ** 2))) + 1)) {
                        $bulletsToDelete = $bullet["id"]; // Дописать if bulletsToDelete
                        $PlayersHit[] = $player["user_id"];
                        var_dump('Playerhit');
                        var_dump($PlayersHit);
                        break;
                    }
                    if (!(in_array($bullet['id'], $bulletsToDelete))) {
                        foreach ($colliders as $collider) {
                            if ($bullet['x'] >= $collider['x'] && $bullet['x'] <= ($collider['x'] + $collider['width']) &&
                                $bullet['y'] <= $collider['y'] && $bullet['y'] >= ($collider['y'] - $collider['height'])) {
                                $bulletsToDelete = $bullet['id'];
                                var_dump($bulletsToDelete);
                                var_dump('bulletTodelete');
                                break;
                            }
                        }

                    }
                }

            }


        }
        if ($PlayersHit) {
            $this->setHit($PlayersHit);

        }
    }

    private function setHit($PlayersHit)
    {
        $this->decreaseHp($PlayersHit);
        return true;
    }

    private function decreaseHp($playersHitId, $dHp = 20)
    {
        $decreaseHpPlayersId = [];
        $deathPlayersId = [];
        $players = $this->db->getPlayersByUserId($playersHitId);
        foreach ($players as $player) {
            if ($player['hp'] - $dHp >= 0) {
                $decreaseHpPlayersId[] = $player['id'];
            } else if ($player['hp'] - $dHp <= 0 || $player['hp'] == 0) {
                $deathPlayersId[] = $player['id'];
            }
            if ($decreaseHpPlayersId) {
                $this->db->decreaseHp($decreaseHpPlayersId, $dHp);
            }
            if ($deathPlayersId) {
                $this->setDeath($deathPlayersId);
            }

        }

    }

    private function setDeath($deathPlayersId)
    {
        $this->db->setDeath($deathPlayersId);
        $this->updateTeamsScore($deathPlayersId);

    }

    private function updateTeamsScore($deathPlayersId)
    {
        $scoreA = 0;
        $scoreB = 0;
        $players = $this->db->getUsersByUserId($deathPlayersId);
        foreach ($players as $player) {
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
                    $spawnPoint = $this->teamBSpawnPoints[array_rand($this->teamASpawnPoints)];
                    $this->db->spawnPlayer($player['user_id'], $spawnPoint['x'], $spawnPoint['y']);
                    $this->db->setStatus($player['user_id'], 'Live');
                }
            }
        }


    }

    private function getFreeSpawnPoint($spawnPoints, $usedSpawnPoints) //$playerX, $playerY,)
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

    public function getPlayers() // deploy погуглить
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
            $this->db->updateBulletsHash($this->genHash());
            $this->db->updatePlayersHash($this->genHash());
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
                'objects' => NULL
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
        return $scene;
    }


    public function startMatch($time = 180)
    {
        $timeStart = time();
        $timeEnd = $timeStart + $time;
        $this->db->startMatch($timeStart, $timeEnd);
        return
            [
                'timeStart' => $timeStart,
                'timeEnd' => $timeEnd,
            ];
    }

    private function endMatch()
    {
        $matchInfo = $this->db->getInfoMatch("Matching");
        if ($matchInfo->status == "Matching") {
            $timeEnd = $matchInfo->time_end;
            $time = time();
            if ($time == $timeEnd || $time + 5 == $timeEnd) {
                return true;
            }
        }

        return false;
    }

    public function setBullet($userId, $x, $y, $vx, $vy)
    {
        $bulletId =
            $this->db->setBullet($userId, $x, $y, $vx, $vy);
        $hash = $this->genHash();
        $this->db->updateBulletsHash($hash);
        return true;
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
