<?php

class DB
{
    private array $UsersData = [
        1 => [
            'login' => 'Vasya',
            'hashPassword' => 'c082282cad5d535061e6205f6e3576a4', // Хэш от логина+пароль(md5('Vasya'.'1234')
            'token' => null
        ],
        2 => [
            'login' => 'Kirill',
            'hashPassword' => 'asd123',
            'token' => null
        ]
    ];

    private $BulletData;
    private $SceneData;

    public function addUser($id, $login, $hashPassword, $token)
    {
        $this->UsersData[$id] = array(

            'id' => $id,
            'login' => $login,
            'hashPassword' => $hashPassword,
            'token' => $token
        );
        var_dump($this->UsersData);

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

    public function getUser($id)
    {
        return $this->UsersData;
    }

    public function setValue($id, string $value, $params = 'token'): void
    {
        $this->UsersData[$id][$params] = $value;
    }

}