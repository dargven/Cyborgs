<?php
header('Content-Type: Application/json; charset = utf-8');
header('Access-Control-Allow-Origin: *');
require_once 'application/Answer.php';
require_once 'application/Application.php';

function result($params)
{
    $method = $params['method'];
    if ($method) {
        $app = new Application();
        switch ($method) {
            case 'login':return $app->login($params);
            default:return [false, 102];
        }
    }
    return [false, 101];
}

echo json_encode(Answer::response(result($_GET)));