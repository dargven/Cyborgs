<?php

class User
{
    private DB $db;

    function __construct($db)
    {
        $this->db = new DB();
    }

    function login($login, $password, $rnd)
    {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            $hashs = md5($user[0]['password'] . $rnd);
            if ($password === $hashs) {
                $token = $this->genToken();
                $this->db->updateToken($user[0]['id'], $token);
                return array(
                    'id' => $user[0]['id'],
                    'name'=> $user[0]['login'],
                    'token' => $token,

                );
            }
            return array(false, 1002);
        }
        return array(false, 1004);
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

    private function genToken()
    {
        return md5(microtime() . 'salt' . rand());
    }

    function authenticateUserByToken($id, $token): ?array
    {
        $user = $this->db->getUserById($id);
        if ($user && $token == $user[0]['token']) {
            return $user;
        }
        return null;
    }

    public function logout($token)
    {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateToken($user[0]['id'], null);
            return true;
        }
        return [false, 1004];
    }

    public function selectTeam($id, $token, $teamId)
    {
        $user = $this->authenticateUserByToken($id, $token);
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
        return [false, 1002];
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

}
