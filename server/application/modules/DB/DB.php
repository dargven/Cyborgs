<?php
//require_once('server/application/modules/DB/Bullet.php');
//
class DB
{
    // $hashPassword=md5($login.’1234’);
    private array $UsersData = [
        1 => [
            'login' => 'Vasya']
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
    public function getUser($id, $params)
    {
        return $this->UsersData[$id]; // В зависимости от params возвращать нужные поля из ассоциативного массива
    }
}