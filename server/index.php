<?php
header('Content-Type: Application/json; charset = utf-8');
header('Access-Control-Allow-Origin: *');
require_once 'application/Answer.php';
require_once 'application/Application.php';
function result($params) {
    $method = $params['method'];
    if ($method) {
        $app = new Application();
        switch ($method) {
            case 'login': return $app->login($params); //Работает
            case 'logout': return $app->logout($params); //Работает
            case 'register': return $app->register($params);//Работает
            case 'selectTeam': return $app->selectTeam($params);//Работает
            case 'getTeamsInfo': return $app->getTeamsInfo($params);//работает
            case 'getPlayers':return $app->getPlayers($params); // -->>> to Test
            case 'setPlayer':return $app->setPlayer($params); // -->>> to Test
            case 'getSkins': return $app->getSkins($params);//работает
            case 'setSkin': return $app->setSkin($params);//работает для тех пользователей, кто добавлен в userSkins
            case 'sendMessage':return $app->sendMessage($params);//Работает
            case 'getMessages':return $app->getMessages($params);//Работает
            case 'sendCodeToResetPassword':return $app->sendCodeToResetPassword($params);// ->> need to test
            case 'getCodeToResetPassword':return $app->getCodeToResetPassword($params);// ->> need to test
            case 'setPasswordAfterReset':return $app->setPasswordAfterReset($params);// ->> need to test
            default: return ['error' => 102];
        }
    }
    return ['error' => 101];
}

echo json_encode(Answer::response(result($_GET)), JSON_UNESCAPED_UNICODE);