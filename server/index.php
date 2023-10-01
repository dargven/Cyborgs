<?php 

// каких-то два header-а добавить надо 

require_once('server\application\Answer.php');
require_once('server\application\Application.php');

function result ($params){
    $method = $params['method'];
    if ($method){
        $app = new Application();
        switch ($method){
            case 'm': return $app -> method ($params);
            //case ...
        }
    }
}