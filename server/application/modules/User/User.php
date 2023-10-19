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
        if($this->db->isItLogin($login)) {
            $hashPassword = $this->db->getParamsUser($login, 'hashPassword');
            $hashs = md5($hashPassword . $rnd);
            if ($hash === $hashs) {
                $token = $this->genToken();
                $this->db->setValue($login, $token, 'token');
                return array(
                    'login' => $login,
                    'token' => $token,
                    'isAuth' => 'yes'

                );
            }
            return array(false, 1002);
        }

        return array(false,1002);
    }

    public function reg($login, $hash)
    {
        if (!$this->db->isItLogin($login)) {
            $token = $this->genToken();
            $this->db->addUser($login, $hash, $token);
            //Здесь ещё должна быть проверка на уникальность логина, но бессмыслено писать
            //без базы данных
            return array(
                'login' => $login,
                'token' => $token,
                'result' => 'ok'
            );
        }
        return array (false, 1003);
    }

    private function genToken(): string
    {
        return md5(microtime() . 'salt' . time());
    }

    function checkToken($token, $login)
    {
        $tokens = $this->db->getParamsUser($login, 'token');
        if ($token === $tokens) {
            return true;
        }
        return false;
    }

    public function logout($login)
    {
        $this->db->setValue($login, null, 'token');
        return true;
    }

}