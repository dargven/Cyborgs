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
        $hashPassword = $this->db->getParamsUser($login, 'hashPassword');
        $hashs = md5($hashPassword . $rnd); //$hashS при rnd=5
        var_dump($hashs);         //9577240a87581e939d679f36f3ffa36e
        if ($hash === $hashs) {
            $token = $this->genToken();
            $this->db->setValue($login,$token,'token');
            return array(
                'login' => $login,
                'token' => $token,
                'isAuth'=>'yes'

            );
        }
        return array(false, 1002);
    }

    public function reg($login, $password, $hash = 0)
    {
        $hash = md5($login . $password);
        $token = $this->genToken();
        $this->db->addUser($login,$hash,$token);
        return array(
            'login' => $login,
            'password' => $password,
            'token' => $token
        );
    }

    private function genToken(): string
    {
        return md5(microtime() . 'salt' . time());
    }

    function checkToken($token, $login){
        $tokens= $this->db->getParamsUser($login,'token');
        if($token===$tokens) {
            return true;
        }
        return false;
        }
    public function unlogin($login){
        $this->db->setValue($login,null, 'token');
        return true;
    }

}




