<?php

class Lobby
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function selectTeam($id, $teamId) // Переписать на объекты. Перенести в lobby
    {

    }

    public function getTeamsInfo($teamId)
    {
        $teams = $this->db->getCountOfPlayersInTeams();
        if ($teams[$teamId]) {
            return [
                'score' => $this->db->getScoreTeams(),
                'numberOfTeamPoints' => $teams
            ];
        }
        return [false, 304];

    }

    public function getSkins($id, $token)
    {
        $user = $this->authenticateUserByToken($id, $token);
        if ($user !== null) {
            $skins = $this->db->getSkins($id); // to do: db->getSkins($id) + table Skins (id(integer),user_id(integer),skin(text),isChosen(boolean))
            if ($skins) {
                return array(
                    'skins' => $skins,
                    'numberOfSkins' => count($skins)
                );
            }
            return [false, 700];
        }
        return [false, 1002];
    }


    public function setSkin($id, $token, $skinId)
    {
        $skins = $this->getSkins($id, $token);
        if ($skins['skins'] !== NULL) {
            if (in_array($skinId, $skins['skins'])) {
                $this->db->setSkin($id, $skinId); // to do: db->setSkin($id,$skin) <=> for $skin isChosen=true
                return array(
                    'id' => $id,
                    'setSkin' => $skinId
                );
            }
            return [false, 701];
        }
        return [false, 700];
    }

}