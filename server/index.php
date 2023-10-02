<?php 

header('Content-Type: Application/json; charset = utf-8');
header('Access-Control-Allow-Origin: *');

require_once('server\application\Answer.php');
require_once('server\application\Application.php');

function result ($params){
    $method = $params['method'];
    if ($method){
        $app = new Application();
        switch ($method){
            case 'm': return $app -> method($params);
            //case ...
        }
    }
}