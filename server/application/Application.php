<?php
require_once 'modules/User/User.php';
require_once 'modules/Game/Game.php';
require_once 'modules/DB/DB.php';


class Application
{
    private $user;
    private $chat;
    private $game;
    private $db;

    function __construct()
    {
        $this->db = new DB();
        $this->user = new User($this->db);
    }

    function reg($params)
    {
        $login = $params['login'];
        $password = $params['password'];

        if ($login && $password ) {
            return $this->user->reg($login, $password);
        }
        return [false, 1001];
    }

    function login($params)
    {
        $login = $params['login'];
        $hash = $params['hash'];
        $rnd = $params['rnd'];
        if ($login && $hash && $rnd) {
            return $this->user->login($login, $hash, $rnd);
        }
        return [false, 1001];
    }


    function checkToken($params)
    {
        $token = $params['token'];
        $login = $params['login'];
        if($token && $login){
            return $this->user->checkToken($token, $login);
        }
        return [false,242];
    }

    function unlogin($params){
        $login = $params['login'];
        if($login){
            return $this->user->unlogin($login);
        }
        return [false,242];
    }
}
