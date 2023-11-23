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

    public function setDestroyObject($token, $objectId, $state) 
    {
        $user = $this->db->getUserByToken($token);
        if ($user) {
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
        return ['error' => 1002];
    }

    public function getObjects($token)
    {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $data = $this->db->getObjects();
            $objects = [];
            $i = 0;
            foreach($data as $object) {
                $objects[$i] = ['objectId' => $object['id'], 'state' => $object['state']];
                $i++;
            }
            return $objects;
        }
        return ['error' => 1002];
    }

}
