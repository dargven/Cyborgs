<?php

class User
{
    private $id;
    private $db;
    function __construct($db)
    {
        $this->db = $db;
    }

    function login($login, $hash, $rnd)
    {
        $hashs = (md5($login . '1234') . $rnd);
        if ($hash === $hashs) {
            $token = md5($hash . rand());
            return array(
                'login' => $login,
                'hash l+p' => $hash,
                'token' => $token,
            );
        }
        return array(false, 1002);
    }
}
function logout($id) //Дописать. Арина.
{
}