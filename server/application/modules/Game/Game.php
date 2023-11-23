<?php

class Game
{
    private DB $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getPlayers()
    {
        return $this->db->getPlayers();
    }

    public function setPlayer($id, $x, $y, $vx, $vy)
    {
        return $this->db->setPlayer($id, $x, $y, $vx, $vy);
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

    }

    public function getBullets()
    {
        return $this->db->getBullets();


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

    public function getObjects()
    {
        return $this->db->getObjects();
    }

}
