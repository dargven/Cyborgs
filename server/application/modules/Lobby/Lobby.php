<?php

class Lobby
{
    private DB $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function selectTeam($id, $teamId)
    {
        return $this->db->addPlayerToTeam($id, $teamId);

    }

    public function getTeamsInfo()
    {
        return $this->db->getTeamsInfo();

    }

    public function getSkins()
    {
        return $this->db->getSkinsInLobby();

    }

    public function FirstSkin($id,$skin_id)
    {
        return $this->db->FirstSkinsInLobby($id,$skin_id);

    }

    public function setSkin($id, $skinId)
    {
        return $this->db->setSkinInLobby($id, $skinId);
    }


}