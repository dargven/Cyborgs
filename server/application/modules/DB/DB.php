<?php
//require_once('server/application/modules/DB/Bullet.php');
//
class DB
{
    // $hashPassword=md5($login.’1234’);
    private array $UsersData = [
        1 => [
            'login' => 'Vasya',
            'hashPassword'=> '9577240a87581e939d679f36f3ffa36e', // Хэш от логина+пароль(md5('Vasya'.'1234')
            'token'=> null
]
    ];
    private $BulletData;
    private $SceneData;

    public function addUser($id, $login, $hashPassword, $token)
    {
        $this->UsersData = array(
            $id => [
                'id' => $id,
                'login' => $login,
                'hashPassword' => $hashPassword,
                'token' => $token]
        );
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

//
    public function getUser($id,string $params)
    {
        return $this->UsersData[$id][$params]; // В зависимости от params возвращать нужные поля из ассоциативного массива
    }
}