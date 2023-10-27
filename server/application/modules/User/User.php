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

//    public function register($login, $hash)
//    {
//        $user = $this->db->getUserByLogin($login);
//        if (!$user) {
//            $this->db->addUser($login, $hash);
//            return true;
//        }
//        return array (false, 1003);
//    }
//
//    private function genToken()
//    {
//        return md5(microtime() . 'salt' . rand());
//    }
//
//    function checkToken($token, $login)
//    {
//        $tokens = $this->db->getParamsUser($login, 'token');
//        return ($token === $tokens);
//        }
//
//    public function logout($login)
//    {
//        $this->db->setValue($login, null, 'token');
//        return true;
//    }
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

    public function getSkins($id, $token)
    {
        $user = $this->db->getUserById($id);
        if ($user) {
            if ($token === $user['token']) {
                $skins = $this->db->getSkins($id); // to do: db->getSkins($id) + table Skins (id(integer),user_id(integer),skin(text),isChosen(boolean))
                if ($skins) return array(
                    'skins' => $skins,
                    'numberOfSkins' => count($skins)
                );
                return [false, 700];
            }
            return [false, 1002];
        }
        return [false, 705];
    }

    public function setSkin($id, $token, $skin) {
        $skins = $this->getSkins($id, $token);
        if ($skins['skins'] !== NULL) {
            if (in_array($skin, $skins['skins'])) {
                $this->db->setSkin($id,$skin); // to do: db->setSkin($id,$skin) <=> for $skin isChosen=true
                return array(
                    'id' => $id,
                    'setSkin' => $skin
                );
            }
            return [false, 701];
        }
        return $skins; //error
    }
}