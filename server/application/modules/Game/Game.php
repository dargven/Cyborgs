<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
require_once __DIR__ . '/SpawnPoints/SpawnPoints.php';
require_once __DIR__ . '/CollidersPositions/CollidersPositions.php';

class Game
{
    private DB $db;
    private  $teamASpawnPoints;
    private  $teamBSpawnPoints;
    private  $colliders;

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
            $infoMatch = $this->match();
            


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
            if ($infoMatch) {
                return $infoMatch;
            }
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
//        $playersHitByBullet = [];
        $damageCounter = [];
        foreach ($bullets as $bullet) {
            if ($bullet['status'] == 'Shoot') {
                foreach ($players as $player) {
                    $id = $player['user_id'];
                    if ((($bullet['x'] - $player['x']) ** 2 + ($bullet['y'] - $player['y']) ** 2) <= 1) {
                        $bulletsToDelete[] = $bullet;
                        $damageCounter[$id] = isset($damageCounter[$id]) ? $damageCounter[$id] + 1 : 1;
                        $playersHit[$id] = [
                            'playerDB' => $player,
                            'hitByAll' => [
                                $bullet['user_id'] => $damageCounter[$id] // Знаем кто попал, сколько урона нанес
                            ],
                            'hitByLast' => $bullet['user_id'], //Знаем кто теоретический убийца
                            'damageCounter' => $damageCounter[$id] // Необходимо для лучшего подсчета смерти
                        ];
//                        $playersHitByBullet += [
//                            $id => $bullet['user_id']
//                        ];
                        continue;
                    }
                    if (!(in_array($bullet['id'], $bulletsToDelete))) {
                        foreach ($colliders as $collider) {
                            if (isset($bullet['px']) && isset($bullet['py'])) {
                                if (
                                    ($bullet['x'] >= $collider['x'] && $bullet['x'] <= ($collider['x'] + $collider['width']) &&
                                        $bullet['y'] <= $collider['y'] && $bullet['y'] >= ($collider['y'] - $collider['height'])) ||
                                    ($bullet['px'] >= $collider['x'] && $bullet['px'] <= ($collider['x'] + $collider['width']) &&
                                        $bullet['py'] <= $collider['y'] && $bullet['py'] >= ($collider['y'] - $collider['height']))
                                ) {
                                    $bulletsToDelete[] = $bullet;
                                    break;
                                } else {
                                    $sides = [
                                        ['x1' => $collider['x'], 'y1' => $collider['y'], 'x2' => $collider['x'], 'y2' => $collider['y'] - $collider['height']],
                                        ['x1' => $collider['x'] + $collider['width'], 'y1' => $collider['y'], 'x2' => $collider['x'] + $collider['width'], 'y2' => $collider['y'] - $collider['height']],
                                        ['x1' => $collider['x'], 'y1' => $collider['y'], 'x2' => $collider['x'] + $collider['width'], 'y2' => $collider['y']],
                                        ['x1' => $collider['x'], 'y1' => $collider['y'] - $collider['height'], 'x2' => $collider['x'] + $collider['width'], 'y2' => $collider['y'] - $collider['height']],
                                    ];
    
                                    foreach ($sides as $side) {
                                        list($x1, $y1, $x2, $y2) = [$bullet['px'], $bullet['py'], $bullet['x'], $bullet['y']];
                                        list($x3, $y3, $x4, $y4) = [$side['x1'], $side['y1'], $side['x2'], $side['y2']];
    
                                        $denominator = ($x1 - $x2) * ($y3 - $y4) - ($y1 - $y2) * ($x3 - $x4);
    
                                        if ($denominator == 0) {
                                            continue;
                                        }
        
                                        $t = (($x1 - $x3) * ($y3 - $y4) - ($y1 - $y3) * ($x3 - $x4)) / $denominator;
                                        $u = -(($x1 - $x2) * ($y1 - $y3) - ($y1 - $y2) * ($x1 - $x3)) / $denominator;
    
                                        if ($t >= 0 && $t <= 1 && $u >= 0 && $u <= 1) {
                                            $bulletsToDelete[] = $bullet;
                                            break;
                                        }
                                    }
                                }
                            } else {
                                if (
                                    ($bullet['x'] >= $collider['x'] && $bullet['x'] <= ($collider['x'] + $collider['width']) &&
                                        $bullet['y'] <= $collider['y'] && $bullet['y'] >= ($collider['y'] - $collider['height']))
                                ) {
                                    $bulletsToDelete[] = $bullet;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        if ($playersHit) {
            $this->setHit($playersHit);
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


    private function setHit($playersHit)
    {
        $this->decreaseHp($playersHit);
    }

    private function decreaseHp($playersHit)
    {
        $dHp = 20;
        $decreaseHpPlayersId = [];
        $deathPlayers = [];
        $deathPlayersId = [];
        $sqlStrokeDHp = '';
        $sqlStrokeSetDeath = '';
        $sqlStrokeAddDamage = '';
        $killsCounterPlayers = [];
        $sqlSetKillerToVictim = '';
        $sqlAddKillsToKiller = '';
        $killersId = [];
        $setKillerToVictim = [];
        foreach ($playersHit as $player) {
            $pHp = $player['playerDB']['hp'];
            $id = $player['playerDB']['user_id'];
            $damageCounter = $player['damageCounter'];
            if ($damageCounter < 4 && $pHp - $dHp > 0) {
                $decreaseHp = 20 * $damageCounter;
                $sqlStrokeDHp .= "WHEN {$id} THEN hp - $decreaseHp ";
                $decreaseHpPlayersId[] = $id;
            } else {
                $status = "Death";
                $sqlStrokeSetDeath .= "WHEN {$id} THEN '$status' ";
                $deathPlayers[] = $player;
                $deathPlayersId[] = $id;
                $killerId = $player['hitByLast'];
                $victimId = $id;
                $killsCounterPlayers[$killerId] = isset($killsCounterPlayers[$killerId])
                    ? $killsCounterPlayers[$killerId] + 1 : 1;
                $setKillerToVictim[$victimId] = [
                    'killer' => $killersId,
                    'victim' => $victimId
                ];

            }
        }

        if ($sqlStrokeDHp) {
            $this->db->decreaseHp($sqlStrokeDHp, $decreaseHpPlayersId);
        }
        if ($sqlStrokeSetDeath) {
            $this->setDeath($sqlStrokeSetDeath, $deathPlayersId, $deathPlayers);
            foreach ($setKillerToVictim as $killerPlayerId) {
                $victimId = $killerPlayerId['victim'];
                $killerPlayerId = $killerPlayerId['killer']; // Victim == user_id;
                $sqlSetKillerToVictim .= "WHEN $victimId THEN $killerPlayerId ";
                $sqlAddKillsToKiller .= "WHEN {$killerPlayerId} THEN kills '+' 1 ";
                $killersId[] = $killerPlayerId;
            }
        }
        if ($sqlSetKillerToVictim) {
            $this->db->addInfoAboutKills($sqlSetKillerToVictim, $deathPlayersId);
        }
        if($sqlAddKillsToKiller){
            $this->db->addKillsToKiller($sqlAddKillsToKiller,$killersId);
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
            if ($player['playerDB']['team_id'] == 0) {
                $scoreA += 1;
            } else if ($player['playerDB']['team_id'] == 1) {
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

    public function getStats($userId)
    {

        $stats = $this->db->getStats($userId);
        return [
            "kills" => $stats->kills,
            "deaths" => $stats->deaths,
            "points" => $stats->points
        ];
    }

    public function getScene($playersHash, $objectsHash, $bulletsHash)
    {
        $hashes = $this->db->getHashes();
        $teamScoreInfo = NULL;
        $updateScene = $this->updateScene($hashes->update_timeout, $hashes->update_timestamp);
        if ($updateScene) {
            $playersHash = $this->genHash();
            $bulletsHash = $this->genHash();
            $objectsHash = $this->genHash();
            $this->db->updateAllGameHashes($playersHash, $bulletsHash, $objectsHash);
            $teamScoreInfo = $this->db->getTeamsInfo();
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
                'teams' => $teamScoreInfo,
                'bullets' => NULL,
                'objects' => NULL,
                'match' => NULL,
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
        if (is_array($updateScene)) {
            $scene['scene']['match']['matchStart'] = $updateScene['match_time_start'];
            $scene['scene']['match']['matchEnd'] = $updateScene['match_time_end'];
            $scene['scene']['match']['matchStatus'] = $updateScene['match_status'];
        }
        return $scene;
    }

    private function match()
    {
        $matchInfo = $this->db->getInfoMatch();
        $timeEnd = $matchInfo->match_time_end;
        $timeStart = $matchInfo->match_time_start;
        $matchStatus = 'playing';
        $time = time() * 1000;
        if ($time >= $timeEnd || $time + 200 >= $timeEnd) {
            $this->endMatch();
            $matchStatus = 'end';
            return [
                'match_time_start' => $timeStart,
                'match_time_end' => $timeEnd,
                'match_status' => 'end'
            ];
        } else if ($matchInfo->match_status == "notPlaying") {
            $this->startMatch();
        }
        return [
            'match_time_start' => $timeStart,
            'match_time_end' => $timeEnd,
            'match_status' => $matchStatus
        ];
    }

    private function startMatch()
    {
        $timeStart = time() * 1000;
        $timeEnd = $timeStart + 180000;
        $this->db->startMatch($timeStart, $timeEnd);
    }


    private function endMatch()
    {
        $matchInfo = $this->db->getInfoMatch();
        sleep(5);
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
