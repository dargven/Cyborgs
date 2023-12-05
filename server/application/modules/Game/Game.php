<?php
require_once __DIR__ . '/SpawnPoints/SpawnPoints.php';
class Game
{
    private DB $db;
    private $teamASpawnPoints;
    private $teamBSpawnPoints;
    
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

//    private function updateScene($timeout, $timestamp) {
//        if (time() - $timestamp >= $timeout) {
//            $this->db->updateTimestamp(time());
//            // пробежаться по всем игрокам
//            // если игрок умер, то удалить его из игроков и добавить запись "трупик" в предметы
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
//            return true;
//        }
//        return false;
//    }

    public function getScene($playersHash, $objectsHash, $bulletsHash)
    {
        $hashes = $this->db->getHashes();
//        if ($this->updateScene($hashes->update_timeout, $hashes->update_timestamp)) {
//            $this->db->updateBulletsHash($this->genHash());
//            $this->db->updatePlayersHash($this->genHash());
//        }
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

    public function spawnPlayers($id, $x, $y)
    {

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


    public function getSkins($id)
    {
        $skins = $this->db->getSkins($id);
        if ($skins) {
            return [
                'skins' => [
                    'skin_id' => $skins->skin_id,
                    'text' => $skins->text
                ],
                'numberOfSkins' => $skins->cnt // Почти всегда будет два, пока не реализуем что-то дополнительное
            ];
        }
        return ['error' => 700];
    }


    public function setSkin($id, $skinId)
    {
        $this->db->setSkin($id, $skinId);
        $hash = $this->genHash();
        $this->db->updateSkinsHash($hash);
        return true;
    }


}
