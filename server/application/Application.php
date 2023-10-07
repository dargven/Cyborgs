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

     function login(array $params)
     {
         $login = $params['login'];
         $password = $params['password'];
         if ($login && $password) {
             return $this->user->login($login, $password);
         }
         return [false, 1001];
     }

 }
