<?php
require_once 'modules/User/User.php';
require_once 'modules/Game/Game.php';
require_once 'modules/DB/DB.php';

class Application
{
    private $user;
    private $chat;
    private $game;

    function __construct()
    {
        $db = new DB();
        $this->user = new User($db);
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
}
