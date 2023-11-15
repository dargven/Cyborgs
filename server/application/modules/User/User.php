<?php
session_start();

use App\server\application\modules\Mailer\Mailer\Mailer;

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
                $token = $this->genToken();
                $this->db->updateToken($user->id, $token);
                return array(
                    'name' => $user->login,
                    'token' => $token,
                );
            }
            return ['error' => 1002];
        }
        return ['error' => 1004];
    }

    public function logout($token)
    {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateToken($user->id, '');
            return true;
        }
        return ['error' => 1004];
    }

    public function register($login, $hash)
    {
        $user = $this->db->getUserByLogin($login);
        if (!$user) {
            $this->db->addUser($login, $hash);
            return true;
        }
        return ['error' => 1003];
    }

    public function resetPasswordByEmail($login, $user)
    {

        $randomNumber = random_int(10000, 99999);
        $_SESSION[$login] = $randomNumber;
        $email = $user->email;
        if ($this->mailer->sendEmail($email, 'verifCode', 'your Verificitaion code is ' . $randomNumber)) {
           return true;
        }
        return ['error' => 707];// could not send message
    }
public function getCodeToResetPassword($login, $code, $user)
{
    if ($_SESSION[$login] == $code) {
        return $this->db->setPassword($user->id, '');
    }
    return ['error' => 708]; // invalid code from e-mail;
}
    public function setPasswordAfterReset($hash, $user)
    {
        $login = $_SESSION[$user->login];
        if ($user && $login) {
            return $this->db->setPassword($user->id, $hash);
        }
        return ['error' => 1002];

    }


}
