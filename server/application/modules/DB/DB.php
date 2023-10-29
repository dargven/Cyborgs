<?php

class DB
{
    //сохраняет соединение с ДБ
    private $link;

    //вызов соединения с БД
    public function __construct()
    {
        $this->connect();
    }

    //ф-ция устанавливает соединение с ДБ
    private function connect()
    {
        $dsn = "mysql:host=localhost;dbname=Cyborgs;charset=utf8";
        $this->link = new PDO($dsn, 'root', '123');
        return $this->link;
    }

    //ф-ция, которая выполняет запрос
    public function execute($sql)
    {
        $sth = $this->link->prepare($sql);
        return $sth->execute();
    }

    //получение рез-та
    public function query($sql)
    {
        $sth = $this->link->prepare($sql);
        $sth->execute();
        $result = $sth->fetchAll(PDO::FETCH_ASSOC);
        if ($result === false) {
            return [];
        }
        return $result;

    }

    public function addUser($login, $password, $name, $soname, $token)
    {
        $user = $this->execute("INSERT INTO `Users` (login,password,name,soname,token)
        VALUES ('$login','$password','$name','$soname','$token')"
        );
    }

    public function getUserByLogin($login)
    {
        return $this->query("SELECT * FROM `Users` WHERE login='$login'");
    }

    public function getUserById($id)
    {
        return $this->query("SELECT * FROM `Users` WHERE id='$id'");
    }

    public function getUserByToken($token)
    {
         return $this->query("SELECT * FROM `Users` WHERE token='$token'");
    }

    public function updateToken($id, $token)
    {
         return $this->execute("UPDATE users SET  token='$token' WHERE id='$id'");
    }

    public function addMessage($user_id, $message)
    {
        return $this->execute("INSERT INTO `Messages` (user_id, message,created )
        VALUES ('$user_id','$message',now())"
        );
    }

    public function addBullet($id_user, $x, $y, $x1, $y1, $speed)
    {
        return $this->execute("INSERT INTO `Bullet` (id_user, x, y, x1, y1, speed)
        VALUES ('$id_user','$x','$y','$x1','$y1','$speed')"
        );
    }

    public function DeleteBullet($id)
    {
         return $this->execute("DELETE * FROM `Bullet` WHERE id='$id'");
    }
} 

