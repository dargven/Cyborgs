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
        if ($teamId == 1 || $teamId == 0) {
            $this->db->addPlayerToTeam($id, $teamId);
            $hash = md5(rand(0, 1000000));
            return true;
        }
        return ['error' => 605];
    } 
    public function getTeamsInfo($hash)
    {
        $hashes = $this->db->getHashes();
        if ($hash !== $hashes->chat_hash) {
            $count = $this->db->getTeamsInfo();
            return [
                'newPlayerCount' => $count,
                'hash' => $hashes->chat_hash
            ];
        }
        return true;  
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