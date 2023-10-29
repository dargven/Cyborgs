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
            var_dump($user);
            $hashs = md5($user[0]['password'].$rnd);
            var_dump($hashs);
            if ($hash === $hashs) {
                $token = $this->genToken();
                $this->db->updateToken($user[0]['id'], $token);
                return array(
                    'id' => $user[0]['id'],
                    'name' => $user[0]['name'],
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
        return array (false, 1003);
    }

    private function genToken()
    {
        return md5(microtime() . 'salt' . rand());
    }

    function checkToken($token, $login)
    {
        $tokens = $this->db->getParamsUser($login, 'token');
        return ($token === $tokens);
        }

    public function logout($login)
    {
        $this->db->setValue($login, null, 'token');
        return true;
    }

}