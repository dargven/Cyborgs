<?php
require_once('server\application\modules\db\DB.php');
require_once('server\application\modules\user\User.php');
require_once('server\application\modules\chat\Chat.php');
require_once('server\application\modules\game\Game.php');

    class Application {
        function __construct (){
            $db = new DB();
            $this -> user = new User($db);
            $this -> chat = new Chat($db);
            $this -> game = new Game($db);
        }
    }