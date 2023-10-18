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
        $id = $params['id'];

        if ($login && $password && $id) {
            return $this->user->reg($id,$login, $password);
        }
        return [false, 1001];
    }

    function login($params)
    {
        $login = $params['login'];
        $hash = $params['hash'];
        $id = $params['id'];
        $rnd = $params['rnd'];
        if ($login && $hash && $rnd && $id) {
            return $this->user->login($id,$login, $hash, $rnd);
        }
        return [false, 1001];
    }


    function checkToken($params)
    {
        $token = $params['token'];
        $id = $params['id'];
        if($token && $id){
            return $this->user->checkToken($token, $id);
        }
        return [false,242];
    }

    function unlogin($params){
        $id = $params['id'];
        if($id){
            return $this->user->unlogin($id);
        }
        return [false,242];
    }
}
