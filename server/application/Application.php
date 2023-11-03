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

    /*************************/
    /* НЕПОВТОРИМЫЙ ОРИГИНАЛ */
    /*************************/
    function login($params) {
        $login = $params['login'];
        $hash = $params['hash'];
        $rnd = $params['rnd'];
        if ($login && $hash && $rnd) {
            return $this->user->login($login, $hash, $rnd);
        }
        return [false, 1001];
    }

    function logout($params) {
        $token = $params['token'];
        if ($token) {
            return $this->user->logout($token);
        }
        return [false, 242];
    }

    function sendMessage($params) {
        $token = $params['token'];
        $message = $params['message'];
        if ($token && $message) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->chat->sendMessage($user->id, $message);
            }
            return [false, 9000];
        }
        return [false, 9000];
    }

    /******************/
    /* ЖАЛКАЯ ПАРОДИЯ */
    /******************/
    function register($params)
    {
        $login = $params['login'];
        $password = $params['password'];
        if ($login && $password) {
            return $this->user->register($login, $password);
        }
        return [false, 1001];
    }

    function selectTeam($params)
    {
        $id = $params['id'];
        $token = $params['token'];
        $teamId = $params['teamId'];
        if ($id && $token && $teamId) {
            return $this->user->selectTeam($id, $token, $teamId);
        }
        return [false, 242];
    }

    function getTeamsInfo($params)
    {
        $teamId = $params['teamId'];
        if ($teamId) {
            $this->user->getTeamsInfo($teamId);
        }
        return [false, 242];
    }


    function getSkins($params)
    {
        $id = $params['id'];
        $token = $params['token'];
        if ($token && $id) {
            return $this->user->getSkins($id, $token);
        }
        return [false, 242];
    }

    function setSkin($params)
    {
        $id = $params['id'];
        $token = $params['token'];
        $skinId = $params['skinId'];
        if ($token && $id && $skinId) {
            return $this->user->setSkin($id, $token, $skinId);
        }
        return [false, 242];
    }


}