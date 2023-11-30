<?php

class Game
{
    private DB $db;
    private $spawnPoints = [
        [
            'x' => 1,
            'y' => 1
        ]
    ];

    public function __construct($db)
    {
        $this->db = $db;
    }

    private function genHash()
    {
        return md5(rand(0, 1000000));
    }


    public function getScene($hashPlayers, $hashObjects, $hashBullets)
    {
        $scene = [
            'hashes' =>
                [
                    'hashPlayers' => NULL,
                    'hashObjects' => NULL,
                    'hashBullets' => NULL
                ],
            'scene' => [
                'players' => NULL,
                'bullets' => NULL,
                'objects' => NULL

            ],
        ];
        $hashes = $this->db->getHashes();

        if ($hashes->players_hash !== $hashPlayers) {
            $players = $this->getPlayers();
            $scene['scene']['players'] = $players;
            $scene['hashes']['hashPlayers'] = $hashPlayers;
        }
        if ($hashes->objects_hash !== $hashObjects) {
            $objects = $this->getObjects();
            $scene['scene']['objects'] = $objects;
            $scene['hashes']['hashObjects'] = $hashObjects;
        }
        if ($hashes->bullets_hash !== $hashBullets) {
            $bullets = $this->getBullets();
            $scene['scene']['bullets'] = $bullets;
            $scene['hashes']['hashBullets'] = $hashBullets;
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

    public function setKill($id,)
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
        $this->db->update
        return true;
    }


}
