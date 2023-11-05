<?php
require_once 'modules/User/User.php';
require_once 'modules/Game/Game.php';
require_once 'modules/DB/DB.php';
require_once 'modules/Lobby/Lobby.php';

class Application
{
    private $user;
    private $chat;
    private $game;
    private $lobby;

    public function __construct()
    {
        $db = new DB();
        $this->user = new User($db);
        $this->lobby = new Lobby($db);
    }

    /*************************/
    /* НЕПОВТОРИМЫЙ ОРИГИНАЛ */
    /*************************/
    function register($params){
        $login = $params['login'];
        $hash = $params['hash'];
        if($login && $hash){
            return $this->user->register($login,$hash);
        }
        return ['error'=>242];
    }

    function login($params)
    {
        $login = $params['login'];
        $hash = $params['hash'];
        $rnd = $params['rnd'];
        if ($login && $hash && $rnd) {
            return $this->user->login($login, $hash, $rnd);
        }
        return ['error'=>1001];
    }

    function logout($params)
    {
        $token = $params['token'];
        if ($token) {
            return $this->user->logout($token);
        }
        return ['error'=>242];
    }

    function sendMessage($params)
    {
        $token = $params['token'];
        $message = $params['message'];
        if ($token && $message) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->chat->sendMessage($user->id, $message);
            }
            return ['error'=>1002];
        }
        return ['error'=>242];
    }

    /******************/
    /* ЖАЛКАЯ ПАРОДИЯ */
    /******************/

//..
    function selectTeam($params)
    {
        $token = $params['token'];
        $teamId = $params['teamId'];
        if ($token && $teamId) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->lobby->selectTeam($user->id, $teamId);
            }
            return ['error'=>1002];
        }
        return ['error'=>242];
    }

    function getTeamsInfo($params)
    {
        $teamId = $params['teamId'];
        if ($teamId) {
            $this->user->getTeamsInfo($teamId);
        }
        return ['error'=>242];
    }


    function getSkins($params)
    {
        $id = $params['id'];
        $token = $params['token'];
        if ($token && $id) {
            return $this->user->getSkins($id, $token);
        }
        return ['error'=>242];
    }

    function setSkin($params)
    {
        $id = $params['id'];
        $token = $params['token'];
        $skinId = $params['skinId'];
        if ($token && $id && $skinId) {
            return $this->user->setSkin($id, $token, $skinId);
        }
        return ['error'=>242];
    }


}