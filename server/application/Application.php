<?php
require_once 'modules/User/User.php';
require_once 'modules/Game/Game.php';
require_once 'modules/DB/DB.php';
require_once 'modules/Math/Triangle.php';
require_once 'modules/Math/Polygon.php';

class Application {
    private $user;
    private $chat;
    private $game;
    //private $polygon;

    function __construct() {
        $db = new DB();
        $this->user = new User($db);
        //$this->polygon = new Polygon();
        //$this->triangle = new Triangle();
    }

    function login(array $params) {
        $login = $params['login'];
        $password = $params['password'];
        if ($login && $password) {
            return $this->user->login($login, $password);
        }
        return [false, 1001];
    }

    /*function triangle(array $params): array
    {
        $a1 = $params['a1'];
        $b1 = $params['b1'];
        $c1 = $params['c1'];
        $a2 = $params['a2'];
        $b2 = $params['b2'];
        $c2 = $params['c2'];
        $a3 = $params['a3'];
        $b3 = $params['b3'];
        $c3 = $params['c3'];
        if ($a1 && $b1 && $c1 && $a2 && $b2 && $c2 && $a3 && $b3 && $c3) {
            return $this->triangle->isTriangle($a1, $b1, $c1, $a2, $b2, $c2, $a3, $b3, $c3);
        }
        return array('value' => null,
            'error' => 242);
    }

    function polygon(array $params): array
    {
        $numPoints = $params['numPoints'];
        for ($i = 1; $i <= $numPoints; $i++) {
            $x = $params["x$i"];
            $y = $params["y$i"];
            $z = $params["z$i"];
            $this->polygon->addPoint($x, $y, $z);
        }
        return $this-> polygon->getResultOfAllPolygon();
    }*/
}
