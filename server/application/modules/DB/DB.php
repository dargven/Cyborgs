<?php

class DB
{
    //сохраняет соединение с ДБ
    private $link;

    //вызов соединения с БД
    public function __construct(){
        $this->connect();
    }

    //ф-ция устанавливает соединение с ДБ
    private function connect(){
        $dsn = "mysql:host=localhost;dbname=Cyborgs;charset=utf8" ;
        $this->link = new PDO($dsn, username:'root',password:'');
        return $this;
    }
    //ф-ция, которая выполняет запрос
    public function execute($sql){
        $sth = $this->link->prepare($sql);
        return $sth->execute();
    }
    //получение рез-та
    public function query($sql){
        $sth = $this->link->prepare($sql);
        $sth->execute();
        $result = $sth->fetchAll(PDO::FETCH_ASSOC);
        if ($result === false)
        {
            return[];
        }
        return $result;

    }
    public function addUser($login,$password,$name,$soname,$token){
        $db = new DB();
        $user = $db->execute("INSERT INTO `Users` (login,password,name,soname,token)
        VALUES ('$login','$password','$name','$soname','$token')"
        );
    }
    
    public function getUserByLogin($login){
        $db = new DB();
        $user = $db->query("SELECT * FROM `Users` WHERE login='$login'");
    }
    
    public function getUserById($id){
        $db = new DB();
        $user = $db->query("SELECT * FROM `Users` WHERE id='$id'");
    }
    
    public function getUserByToken($token){
        $db = new DB();
        $user = $db->query("SELECT * FROM `Users` WHERE token='$token'");
    }
    
    public function updateToken($id,$token){
        $db = new DB();
        $user = $db->execute("UPDATE users SET  token='$token' WHERE id='$id'");
    }

    public function addMessage($user_id,$message){
        $db = new DB();
        $message = $db->execute("INSERT INTO `Messages` (user_id, message,created )
        VALUES ('$user_id','$message',now())"
        );
    }

    public function addBullet($id_user,$x,$y,$x1,$y1,$speed){
        $db = new DB();
        $bullet = $db->execute("INSERT INTO `Bullet` (id_user, x, y, x1, y1, speed)
        VALUES ('$id_user','$x','$y','$x1','$y1','$speed')"
        );
    }

    public function DeleteBullet($id){
        $db = new DB();
        $bullet = $db->execute("DELETE * FROM `Bullet` WHERE id='$id'");
    }
} 

$db= new DB();
$rt = $db->addUser('вася','123','Игорь','Раскольников','1');
