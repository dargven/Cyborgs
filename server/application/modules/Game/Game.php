<?php
require_once __DIR__ . '/SpawnPoints/SpawnPoints.php';

class Game
{
    private DB $db;
    private array $teamASpawnPoints;
    private array $teamBSpawnPoints;

    public function __construct($db)
    {
        $this->db = $db;
        $this->teamASpawnPoints = SpawnPoints::$spawnPoints[0];
        $this->teamBSpawnPoints = SpawnPoints::$spawnPoints[1];
    }

    private function genHash()
    {
        return md5(rand(0, 1000000));
    }

    public function spawnPlayers()
    {
        $players = $this->db->getPlayers();
        $playersA = [];
        $playersB = [];
        foreach ($players as $player) {
            if ($player['team_id'] == 0) {
                $playersA += $player;
            } else $playersB += $player;
        }
        foreach ($this->teamASpawnPoints as $spawnP){
            foreach ($playersA as $plA){
                $this->db->spawnPlayer(intval($plA['user_id']), intval($spawnP['x']), intval($spawnP['y']));
                break;
            }
        }
        foreach ($this->teamBSpawnPoints as $spawnP){
            foreach ($playersB as $plB){
                $this->db->spawnPlayer(intval($plB['user_id']), intval($spawnP['x']), intval($spawnP['y']));
                break;
            }
        }

    }

    private function updateScene($timeout, $timestamp)
    {
        if (time() - $timestamp >= $timeout) {
            $this->db->updateTimestamp(time());
//            // пробежаться по всем игрокам
//            // если игрок умер, то удалить его из игроков и добавить запись "трупик" в предметы // или поменять статус на мертв
//
//            // пробежаться по всем пулям
//            // если у пули статус "куда-то попала" - удалить её
//
//            // пробежаться по всем игрокам
//            // если пуля убила игрока, то поменять его статус на "умер"
//            // поменять статус пули на "куда-то попала"
//            // записать запись об убийстве игрока в stats
//            // игроку-убийце посчитать количество его убийств и обновить поле kills в таблице players
//            //$players = $this->getPlayers();
//            //$bullets = $this->getBullets();
            return true;
        }
        return false;
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
            $scene['hashes']['playersHash'] = $playersHash;
        }
        if ($hashes->objects_hash !== $objectsHash) {
            $objects = $this->getObjects();
            $scene['scene']['objects'] = $objects;
            $scene['hashes']['objectsHash'] = $objectsHash;
        }
        if ($hashes->bullets_hash !== $bulletsHash) {
            $bullets = $this->getBullets();
            $scene['scene']['bullets'] = $bullets;
            $scene['hashes']['bulletsHash'] = $bulletsHash;
        }
        return $scene;
    }

    public function getBullets()
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

    public function reSpawn($playerId)
    {
        $teamId = $this->db->getTeamByPlayerId($playerId)->teamId;
        if ($teamId === 0) $coords = $this->teamASpawnPoints[rand(0, 4)];
        else $coords = $this->teamBSpawnPoints[rand(0, 4)];
        $this->db->spawnPlayer($playerId, $coords['x'], $coords['y']);
        return true;
    }


    public function startMatch($MatchId, $time = 180)
    {

    }

    public function setKill($id)
    {

    }

    public function setBullet($x, $y, $vx, $vy)
    {
        $this->db->setBullet($x, $y, $vx, $vy);
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

    private function decreaseHp($playerId, $dHp)
    {
        $player = $this->db->checkDeath($playerId, $dHp);
        if (!$player) {
            $dHp = max(0, $dHp);
            $this->db->decreaseHp($playerId, $dHp);
            return true; 
        }
        return false; 
    }

    private function checkDeath($playerId, $dHp)
    {
        $player = $this->db->getPlayers();
        if ($player && $player['hp'] > $dHp) {
            return true;
        }
        return false;
    }

//    private function updateScoreInTeam($teamId, $score): true|array
//    {
//        $this->db->updateScoreInTeam($teamId, $score);
//        $team = $this->db-> chekAndGetWinTeam($teamId);
//        if($team){
//          //  $this->db->endGame();
//            return array(
//                'team_id' => $team,
//            );
//        }
//        else{
//            return true;
//        }
//    }

//    public function getSkins($id)
//    {
//        $skins = $this->db->getSkins($id);
//        if ($skins) {
//            return [
//                'skins' => [
//                    'skin_id' => $skins->skin_id,
//                    'text' => $skins->text
//                ],
//                'numberOfSkins' => $skins->cnt // Почти всегда будет два, пока не реализуем что-то дополнительное
//            ];
//        }
//        return ['error' => 700];
//    }


//    public function setSkin($id, $skinId)
//    {
//        $this->db->setSkin($id, $skinId);
//        return true;
//    }


}
