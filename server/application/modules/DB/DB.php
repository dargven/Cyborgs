<?php

class DB
{
    private array $UsersData = [
        'Vasya' => [
            'login' => 'Vasya',
            'hashPassword' => 'c082282cad5d535061e6205f6e3576a4', // Хэш от логина+пароль(md5('Vasya'.'1234')
            'token' => null
        ],
        'Kirill' => [
            'login' => 'Kirill',
            'hashPassword' => 'asd123',
            'token' => null
        ]
    ];

    private $BulletData;
    private $SceneData;

    public function addUser($login, $hashPassword, $token)
    {
        $this->UsersData[$login] = array(

            'login' => $login,
            'hashPassword' => $hashPassword,
            'token' => $token
        );

    }

    public function isItLogin($login)
    {
        $users = $this->UsersData;
        foreach ($users as $user) {
            if ($login === $user['login']) {
                return false;
            }
        }
        return true;
    }

    public function addBullets($bulletId, $Bullet)
    {
        $this->BulletData = array(
            'bulletId' => $bulletId,
            'Bullet' => $Bullet
        );
    }

    public function addScene($scene)
    {
        $this->SceneData = array(
            'scene' => $scene,
        );
    }

    public function getParamsUser($id, string $params = 'token')
    {
        return $this->UsersData[$id][$params];

    }

    public function getUser($login)
    {
        return $this->UsersData[$login];
    }

    public function setValue($login, string $value, $params = 'token'): void
    {
        $this->UsersData[$login][$params] = $value;
    }

}