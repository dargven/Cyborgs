<?php

class User
{
    private DB $db;

    function __construct($db)
    {
        $this->db = new DB();
    }

    function login($login, $hash, $rnd)
    {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            $hashs = md5($user[0]['password'] . $rnd);
            if ($hash === $hashs) {
                $token = $this->genToken();
                $this->db->updateToken($user[0]['id'], $token);
                return array(
                    'id' => $user[0]['id'],
                    'token' => $token,
                );
            }
            return array(false, 1002);
        }
        return array(false, 1004);
    }

    public function register($login, $hash)
    {
        $user = $this->db->getUserByLogin($login);
        if (!$user) {
            $this->db->addUser($login, $hash);
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
        if ($user && $token === $user[0]['token']) {
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

    public function selectTeam($id, $token, $teamCode)
    {
        $user = $this->authenticateUserByToken($id, $token);
        if ($user !== null) {

        }
    }

    public function getTeamsInfo($id, $token)
    {
        $user = $this->authenticateUserByToken($id, $token);
        if ($user !== null) {


        }
    }

}