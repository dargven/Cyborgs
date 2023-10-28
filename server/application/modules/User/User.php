<?php

class User
{
    private $db;

    function __construct($db)
    {
        $this->db = new DB();
    }

    function login($login, $hash, $rnd)
    {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            $hashs = md5($user->password.$rnd);
            if ($hash === $hashs) {
                $token = $this->genToken();
                $this->db->setValue($login, $token, 'token');
                return array(
                    'id' => $user->id,
                    'name' => $user->name,
                    'token' => $token,
                );
            }
            return array(false, 1002);
        }
        return array(false, 1004);
    }   

    public function register($login, $hash)
    {
        $user = $this->db->getUserByLogin($login); // после добавления метода в DB.php, в старой версии getUser($login)
        if (!$user) {
            $this->db->addUser($login, $hash);
            return true;
        }
        return array (false, 1003);
    }

    public function autoregister() 
    {
        $login = 'USER_'.bin2hex(random_bytes(10));
        $hash = md5(bin2hex(random_bytes(20)).rand());
        $token = md5($hash.rand());
        //$token in localstorage .....
        return $this->register($login, $hash);
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