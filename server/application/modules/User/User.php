<?php
session_start();

require_once __DIR__ . '/../../modules/Mailer/Mailer.php';

class User
{
    private DB $db;
    private Mailer $mailer;

    function __construct($db)
    {
        $this->db = $db;
        $this->mailer = new Mailer();
    }

    private function genToken()
    {
        return md5(microtime() . 'salt' . rand());
    }

    public function getUserByToken($token)
    {
        return $this->db->getUserByToken($token);
    }

    public function getUserByLogin($login)
    {
        return $this->db->getUserByLogin($login);
    }

    public function login($login, $hash, $rnd)
{
    $user = $this->db->getUserByLogin($login);
    if ($user) {
        $hashS = md5($user->password . $rnd);
        if ($hash === $hashS) {
//            if (!$user->token) { //Проверка на игру с двух устройств(скорее всего не понадобится)
                $token = $this->genToken();
                $this->db->updateToken($user->id, $token);
                return array(
                    'name' => $user->login,
                    'token' => $token,
                );
//            }
//            return ['error' => 1005];

        }
        return ['error' => 1002];
    }
    return ['error' => 1004];
}

    public function autoLogin($user)
    {
        $token = $this->genToken();
        $this->db->updateToken($user->id, $token);
        return [
            'name' => $user->login,
            'token' => $token
        ];

    }

    public function logout($token)
    {
        $user = $this->db->getUserByToken($token);
        if ($user) {
//          $this->db->deletePlayerInPlayers($token);
            $this->db->deletePlayerInTeams($token);
            $this->db->updateToken($user->id, NULL);
            return true;
        }
        return ['error' => 1004];
    }

    public function register($login, $hash, $name, $email)
    {
        $user = $this->db->getUserByLogin($login);
        if (!$user) {
            $uuid = uniqid();
            $this->db->addUser($login, $hash, $name, $email, $uuid);
            return true;
        }
        return ['error' => 1003];
    }

    public function sendCodeToResetPassword($login, $user)
    {
        $randomNumber = random_int(10000, 99999);
        $email = $user->email;
        $_SESSION['login'] = $login;
        $_SESSION['rndCode'] = $randomNumber;
        $_SESSION['e-mail'] = $email;
        $_SESSION['idUser'] = $user->id;
        if ($this->mailer->sendEmail($email, 'verifCode', 'your Verificitaion code is ' . $randomNumber)) {
            return true;
        }
        return ['error' => 707];// could not send message
    }

    public function getCodeToResetPassword($code)
    {
        if (isset($_SESSION['idUser']) && isset($_SESSION['rndCode'])) {
            $id = $_SESSION['idUser'];
            if ($_SESSION['rndCode'] == $code) {
                $this->sendWarningOfAttemptResetPassword();
                $this->db->setPassword($id, '');
                $this->db->updateToken($id, NULL);
                return true;
            }
            return ['error' => 708]; // invalid code from e-mail;
        }
        return ['error' => 709]; //'709'=>'session did not start or you need use previous method',


    }

    public function setPasswordAfterReset($hash)
    {
        if (isset($_SESSION['idUser'])) {
            $id = $_SESSION['idUser'];
            $this->sendWarningOfReplacePassword();
            $this->db->setPassword($id, $hash);
            return true;
        }
        return ['error' => 709];// 709'=>'session did not start
        // or you need use previous method',


    }

    public function sendWarningOfAttemptResetPassword()
    {
        if (isset($_SESSION['idUser']) && isset($_SESSION['e-mail'])) {
            $email = $_SESSION['e-mail'];
            return $this->mailer->sendEmail($email, "Attempt to Replaced Password", "If you are not trying to change your password now, contact the support");
        }
        return ['error' => 709];
    }

    public function sendWarningOfReplacePassword()
    {
        if (isset($_SESSION['idUser']) && isset($_SESSION['e-mail'])) {
            $email = $_SESSION['e-mail'];
            return $this->mailer->sendEmail($email, "Replaced Password", "The Password was be replaced. You can login in your account.");
        }
        return ['error' => 709];
    }


}
