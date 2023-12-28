<?php
require_once 'modules/User/User.php';
require_once 'modules/Game/Game.php';
require_once 'modules/DB/DB.php';
require_once 'modules/Lobby/Lobby.php';
require_once 'modules/Chat/Chat.php';


class Application
{
    private User $user;
    private Chat $chat;
    private Game $game;
    private Lobby $lobby;

    public function __construct()
    {
        $db = new DB();
        $this->user = new User($db);
        $this->lobby = new Lobby($db);
        $this->chat = new Chat($db);
        $this->game = new Game($db);
    }





    /*************************/
    /* НЕПОВТОРИМЫЙ ОРИГИНАЛ */
    /*************************/
    function register($params)
    {
        $login = $params['login'];
        $name = $params['name'];
        $email = $params['email'];
        $hash = $params['hash'];
        if ($login && $hash && $name && $email) {
            return $this->user->register($login, $hash, $name, $email);
        }
        return ['error' => 242];
    }

    function autoLogin($params)
    {
        $token = $params['token'];
        $uuid = $params['uuid'];
        if ($token && $uuid) {
            $user = $this->user->getUserByUuid($uuid);
            if ($user) {
                return $this->user->autoLogin($user, $token);
            }
            return ['error' => 705];
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

    function getMessages($params)
    {
        $token = $params['token'];
        $hash = $params['hash'];
        if ($token && $hash) {
            $user = $this->user->getUserByToken($token);
            if ($user) {
                return $this->chat->getMessage($hash);
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
            $user = $this->user->getUserByToken($token);
            if ($user) {
                return $this->chat->sendMessage($user->id, $message);
            }
            return ['error' => 1002];
        }
        return ['error' => 706];
    }


    function selectTeam($params)
    {
        $token = $params['token'];
        $teamId = $params['teamId'];
        if ($token && ($teamId || $teamId == 0)) {
            $user = $this->user->getUserByToken($token);
            if ($user) {
                return $this->lobby->selectTeam($user->id, $teamId);
            }
            return ['error' => 1002];
        }
        return ['error' => 242];
    }

    function getScene($params)
    {
        $token = $params['token'];
        $playersHash = $params['playersHash'];
        $bulletsHash = $params['bulletsHash'];
        $objectsHash = $params['objectsHash'];
        if (
            $token && ($playersHash || $playersHash == 0) && ($bulletsHash || $bulletsHash == 0)
            && ($objectsHash || $objectsHash == 0)
        ) {
            $user = $this->user->getUserByToken($token);
            if ($user) {
                return $this->game->getScene($playersHash, $objectsHash, $bulletsHash);
            }
            return ['error' => 1002];
        }
        return ['error' => 242];
    }

    function getPlayers($params)
    {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUserByToken($token);
            if ($user) {
                return $this->game->getPlayers();
            }
            return ['error' => 1002];
        }
        return ['error' => 242];
    }

    function setPlayer($params)
    {
        $token = $params['token'];
        $x = $params['x'];
        $y = $params['y'];
        $vx = $params['vx'];
        $vy = $params['vy'];
        $dx = $params['dx'];
        $dy = $params['dy'];
        if (
            $token && ($x || $x == 0) && ($y || $y == 0) && ($vx || $vx == 0)
            && ($vy || $vy == 0) && ($dx || $dx == 0) && ($dy || $dy == 0)
        ) {
            $user = $this->user->getUserByToken($token);
            if ($user) {
                return $this->game->setPlayer($user->id, $x, $y, $vx, $vy, $dx, $dy);
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

            $user = $this->user->getUserByToken($token);
            if ($user) {
                return $this->lobby->getTeamsInfo();
            }
            return ['error' => 1002];
        }
        return ['error' => 242];
    }

    function doShoot($params)
    {
        $token = $params['token'];
        $x = $params['x'];
        $y = $params['y'];
        $vx = $params['vx'];
        $vy = $params['vy'];
        if ($token && ($x || $x == 0) && ($y || $y == 0) && ($vx || $vx == 0) && ($vy || $vy == 0)) {
            $user = $this->user->getUserByToken($token);
            if ($user) {
                return $this->game->doShoot($user->id, $x, $y, $vx, $vy);
            }
            return ['error' => 1002];
        }
        return ['error' => 242];
    }

    function getSkins($params)
    {
        $token = $params['token'];
        if ($token) {

            $user = $this->user->getUserByToken($token);
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

            $user = $this->user->getUserByToken($token);
            if ($user) {
                return $this->lobby->setSkin($user->id, $skinId);
            }
            return ['error' => 1002];
        }
        return ['error' => 242];
    }

    function setDestroyObject($params)
    {
        $token = $params['token'];
        $objectId = $params['objectId'];
        $state = $params['state'];
        if ($token && $objectId && ($state || $state === "0")) {
            $user = $this->user->getUserByToken($token);
            if ($user) {
                return $this->game->setDestroyObject($objectId, $state);
            }
            return ['error' => 1002];
        }
        return ['error' => 242];
    }

    function getObjects($params)
    {
        $token = $params['token'];
        if ($token) {
            $user = $this->user->getUserByToken($token);
            if ($user) {
                return $this->game->getObjects();
            }
            return ['error' => 1002];
        }
        return ['error' => 242];
    }

    function sendCodeToResetPassword($params)
    {
        $login = $params['login'];
        if ($login) {
            $user = $this->user->getUserByLogin($login);
            if ($user) {
                return $this->user->sendCodeToResetPassword($login, $user);
            }
            return ['error' => 1002];
        }
        return ['error' => 242];
    }

    function getCodeToResetPassword($params)
    {
        $code = $params['code'];
        if ($code) {
            return $this->user->getCodeToResetPassword($code);
        }
        return ['error' => 242];
    }

    function setPasswordAfterReset($params)
    {
        $hash = $params['hash'];
        if ($hash) {
            return $this->user->setPasswordAfterReset($hash);
        }
        return ['error' => 242];
    }

    function setHit($params)
    {
        $token = $params['playerId'];
        $bulletId = $params['bulletId'];
        if ($token && $bulletId) {
            $user = $this->user->getUserByToken($token);
            if ($user) {
                return $this->game->setHit($user->id, $bulletId);
            }
        }
    }
}
