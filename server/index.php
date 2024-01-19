<?php
header('Content-Type: Application/json; charset = utf-8');
header('Access-Control-Allow-Origin: *');
require_once 'config.php';
require_once 'application/Answer.php';
require_once 'application/Application.php';
function result($params) {
    $method = $params['method'];
    if ($method) {
        $app = new Application();
        switch ($method) {
            case 'register': return $app->register($params);
            case 'login': return $app->login($params);
            case 'autoLogin':return $app->autoLogin($params);
            case 'logout': return $app->logout($params);
            case 'sendCodeToResetPassword':return $app->sendCodeToResetPassword($params);
            case 'getCodeToResetPassword':return $app->getCodeToResetPassword($params);
            case 'setPasswordAfterReset':return $app->setPasswordAfterReset($params);

            case 'sendMessage':return $app->sendMessage($params);
            case 'getMessages':return $app->getMessages($params);

            case 'selectTeam': return $app->selectTeam($params);
            case 'getTeamsInfo': return $app->getTeamsInfo($params);
            case 'getPlayers':return $app->getPlayers($params);
            case 'setPlayer':return $app->setPlayer($params);
            case 'getSkins': return $app->getSkins($params);
            case 'setSkin': return $app->setSkin($params);


            case 'setDestroyObject': return $app->setDestroyObject($params);
            case 'getObjects': return $app->getObjects($params);
            case 'getScene':return $app->getScene($params);
            case 'shoot': return $app->shoot($params);
            case 'getStats':return  $app->getStats($params);
            default: return ['error' => 102];
        }
    }
    return ['error' => 101];
}

echo json_encode(Answer::response(result($_GET)), JSON_UNESCAPED_UNICODE);