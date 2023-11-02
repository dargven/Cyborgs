<?php
require_once 'modules/User/User.php';
require_once 'modules/Game/Game.php';
require_once 'modules/DB/DB.php';


class Application
{
    private User $user;
    private $chat;
    private $game;
    private DB $db;

    function __construct()
    {
        $this->db = new DB();
        $this->user = new User($this->db);
    }

    function register($params)
    {
        $login = $params['login'];
        $password = $params['password'];
        if ($login && $password) {
            return $this->user->register($login, $password);
        }
        return [false, 1001];
    }

    function login($params)
    {
        $login = $params['login'];
        $password = $params['password'];
        $rnd = $params['rnd'];
        if ($login && $password && $rnd) {
            return $this->user->login($login, $password, $rnd);
        }
        return [false, 1001];
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
        $skin = $params['skin'];
        if ($token && $id && $skin) {
            return $this->user->setSkin($id, $token, $skin);
        }
        return [false, 242];
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