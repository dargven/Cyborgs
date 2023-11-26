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
        $this->db->addPlayerToTeam($id, $teamId);
        return true;
    }

    public function getTeamsInfo()
    {
        return $this->db->getTeamsInfo();
    }

    public function getSkins()
    {
        return $this->db->getSkinsInLobby();
    }

    public function setSkin($id, $skinId)
    {
        $this->db->setSkinInLobby($id, $skinId);
        return true;
    }


}