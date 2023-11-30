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
            $this->db->updatePlayersHash($hashPlayers);
            $scene['hashes']['hashPlayers'] = $hashPlayers;
        }
        if ($hashes->objects_hash !== $hashObjects) {
            $objects = $this->getObjects();
            $scene['scene']['objects'] = $objects;
            $this->db->updateObjectsHash($hashObjects);
            $scene['hashes']['hashObjects'] = $hashObjects;
        }
        if ($hashes->bullets_hash !== $hashBullets) {
            $bullets = $this->getBullets();
            $scene['scene']['bullets'] = $bullets;
            $this->db->updateBulletsHash($hashBullets);
            $scene['hashes']['hashBullets'] = $hashBullets;
        }

        return $scene;
    }
public function getBullets(){
        return $this->db->getBullets();
}
public function getObjects(){
        return $this->db->getObjects();
}
public function getPlayers(){
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
        return true;
    }


    public function setPlayer($id, $x, $y, $vx, $vy, $dx, $dy)
    {
        $this->db->setPlayer($id, $x, $y, $vx, $vy, $dx, $dy);
        return true;
    }

    public function getSkins($id)
    {
        $skins = $this->db->getSkins($id);
        if ($skins) {
            return [
                'skins' => [
                    'skin_id' => $skins->skin_id,
                    'text' => $skins->text
                ], // Объект скинов
                'numberOfSkins' => $skins->cnt // Почти всегда будет два, пока не реализуем что-то дополнительное
            ];
        }
        return ['error' => 700];
    }


    public function setSkin($id, $skinId)
    {
        $this->db->setSkin($id, $skinId); // Потребуется дополнительная проверка, если будут ещё какие-то скины
        return true;
    }


    public function setDestroyObject($objectId, $state)
    {
        $object = $this->db->getObjectById($objectId);
        if ($object) {
            if ($state === 0 || $state === 1) {
                $this->db->setDestroyObject($objectId, $state);
                return true;
            }
            return ['error' => 801];
        }
        return ['error' => 800];
    }


}
