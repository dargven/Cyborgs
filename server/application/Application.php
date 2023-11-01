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

    function register($params)
    {
        $login = $params['login'];
        $hash = $params['hash'];

        if ($login && $hash) {
            return $this->user->register($login, $hash);
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
        $login = $params['login'];
        $token = $params['token'];
        if ($token && $login) {
            return $this->user->checkToken($login, $token);
        }
        return [false, 242];
    }

    function logout($params)
    {
        $token = $params['token'];
        if ($token) {
            return $this->user->logout($token);
        }
        return [false, 242];
    }

    function selectTeam($params)
    {
        $id = $params['id'];
        $token = $params['token'];
        $teamId = $params['teamId'];
        if ($id && $token && $teamId) {
            $this->user->selectTeam($id, $token, $teamId);
        }
        return [false, 242];
    }
    function getTeamsInfo($params){
        $teamId = $params['teamId'];
        if($teamId){
            $this->user->getTeamsInfo($teamId);
        }
        return [false,242];
    }

}