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
    function checkToken($id, $params)
    {
        $token = $params['token'];
        $tokenS = $this->db->getUser($id, 'token');
        return $token === $tokenS;
    }
}
