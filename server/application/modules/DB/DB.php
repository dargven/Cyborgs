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
        $config = require_once 'config.php';
        $dsn = 'mysql:host='.$config['host'].';dbname='.$config['db_name'].';charset='.$config['charset'];
        $this->link = new PDO($dsn, $config['username'], $config['password']);
        var_dump($this->link);
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
        var_dump($user);
        return $user;
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

}   