<?php

class User
{
    private DB $db;

    function __construct($db)
    {
        $this->db = $db;
    }

    private function genToken()
    {
        return md5(microtime() . 'salt' . rand());
    }

    public function getUser($token)
    {
        return $this->db->getUserByToken($token);
    }

    public function login($login, $hash, $rnd)
    {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            $hashS = md5($user->password . $rnd);
            if ($hash === $hashS) {
                $token = $this->genToken();
                $this->db->updateToken($user->id, $token);
                return array(
                    'name' => $user->login,
                    'token' => $token,
                );
            }
            return ['error' => 1002];
        }
        return ['error' => 1004];
    }

    public function logout($token)
    {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateToken($user->id, null);
            return true;
        }
        return ['error' => 1004];
    }

    public function register($login, $hash)
    {
        $user = $this->db->getUserByLogin($login);
        if (!$user) {
            $this->db->addUser($login, $hash);
            return true;
        }
        return ['error' => 1003];
    }

}
