<?php

class User {
    private $db;

    function __construct($db) {
        $this->db = $db;
    }

    private function genToken() {
        return md5(microtime() . 'salt' . rand());
    }

    public function getUser($token) {
        return $this->db->getUserByToken($token);
    }

    public function login($login, $hash, $rnd) {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            $hashS = md5($user->password.$rnd);
            if ($hash === $hashS) {
                $token = $this->genToken();
                $this->db->updateToken($user->id, $token);
                return array(
                    'name' => $user->login,
                    'token' => $token,
                );
            }
            return array(false, 1002);
        }
        return array(false, 1004);
    }

    public function logout($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateToken($user->id, null);
            return true;
        }
        return [false, 1004];
    }

    public function register($login, $password)
    {
        $user = $this->db->getUserByLogin($login);
        if (!$user) {
            $this->db->addUser($login, $password);
            return true;
        }
        return array(false, 1003);
    }



    public function selectTeam($id, $token, $teamId)
    {
        /*$user = $this->authenticateUserByToken($id, $token);
        if ($user !== null) { // !Ошибка авторизации
            $teams = $this->db->getCountOfPlayersInTeams();
            if ($teams[$teamId]) {
                if ($teams[$teamId]['countOfPlayers'] <= 5) { // !Полная команда
                    switch ($teamId) {
                        case '1':
                        {
                            if ($teams[0]['countOfPlayers'] < $teams[1]['countOfPlayers']) {
                                if ($teams[1]['countOfPlayers'] - $teams[0]['countOfPlayers'] <= 3) {
                                    $this->db->addPlayerToTeam($id, $teamId);
                                    return true;

                                }
                                return [false, 605];

                            }
                            return [false, 605];
                        }
                        case '2':
                        {
                            if ($teams[1]['countOfPlayers'] < $teams[0]['countOfPlayers']) {
                                if ($teams[0]['countOfPlayers'] - $teams[1]['countOfPlayers'] <= 3) {
                                    $this->db->addPlayerToTeam($id, $teamId);
                                    return true;
                                }
                                return [false, 605];

                            }
                            return [false, 605];

                        }
                    }

                }
                return [false, 603];

            }
            return [false, 604];

        }
        return [false, 1002];*/
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
        /*$user = $this->authenticateUserByToken($id, $token);
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
        return [false, 1002];*/
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
