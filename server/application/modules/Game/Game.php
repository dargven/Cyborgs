<?php

class Game
{
    private $db;
    public function __construct($db)
    {
        $this->db = $db;
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
}
