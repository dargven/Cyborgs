<?php
require_once 'modules/User/User.php';
require_once 'modules/Game/Game.php';
require_once 'modules/DB/DB.php';
require_once 'modules/Lobby/Lobby.php';
require_once 'modules/Chat/Chat.php';
require_once 'modules/Mailer/Mailer.php';

class Application
{
    private $user;
    private $chat;
    private $game;
    private $lobby;
    private $mailer;

    public function __construct()
    {
        $db = new DB();
        $this->user = new User($db);
        $this->lobby = new Lobby($db);
        $this->chat = new Chat($db);
        $this->game = new Game($db);
        $this->mailer = new Mailer();
    }

    function sendEmail($params)
    {
        $recipient = $params['recipient'];
        $subject = $params['subject'];
        $body = $params['body'];
        if ($recipient && $body && $subject){
            return $this->mailer->sendMail($recipient, $body, $subject);
        }
        return ['error'=>'242'];
    }




    /*************************/
    /* НЕПОВТОРИМЫЙ ОРИГИНАЛ */
    /*************************/
    function register($params)
    {
        $login = $params['login'];
        $hash = $params['hash'];
        if ($login && $hash) {
            return $this->user->register($login, $hash);
        }
        return ['error' => 242];
    }

    function login($params)
    {
        $login = $params['login'];
        $hash = $params['hash'];
        $rnd = $params['rnd'];
        if ($login && $hash && $rnd) {
            return $this->user->login($login, $hash, $rnd);
        }
        return ['error' => 1001];
    }

    function logout($params)
    {
        $token = $params['token'];
        if ($token) {
            return $this->user->logout($token);
        }
        return ['error' => 242];
    }

    function getMessage($params)
    {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->chat->getMessage();
            }
            return ['error' => 1002];
        }
        return ['error' => 242];
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
            return ['error' => 1002];
        }
        return ['error' => 242];
    }


    function selectTeam($params)
    {
        $token = $params['token'];
        $teamId = $params['teamId'];
        if ($token && $teamId) {
            $user = $this->user->getUser($token);
            if ($user) {
                return $this->lobby->selectTeam($user->id, $teamId);
            }
            return ['error' => 1002];
        }
        return ['error' => 242];
    }




    /******************/
    /* ЖАЛКАЯ ПАРОДИЯ */
    /******************/

//..

    function getTeamsInfo($params)
    {
        $token = $params['token'];
        if ($token) {

            $user = $this->user->getUser($token);
            if ($user) {
                return $this->lobby->getTeamsInfo();
            }
            return ['error' => 1002];

        }
        return ['error' => 242];

    }


    function getSkins($params)
    {
        $token = $params['token'];
        if ($token) {

            $user = $this->user->getUser($token);
            if ($user) {
                return $this->lobby->getSkins();
            }
            return ['error' => 1002];
        }
        return ['error' => 242];

    }

    function setSkin($params)
    {
        $token = $params['token'];
        $skinId = $params['skinId'];
        if ($token && $skinId) {

            $user = $this->user->getUser($token);
            if ($user) {
                return $this->lobby->setSkin($user->id, $skinId);

            }
            return ['error' => 1002];

        }
        return ['error' => 242];

    }


}