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
        $dsn = 'mysql:host='.$config['host'].';dbname='.$config['db_name'].';charset='.$config['charset'] ;
        $this->link = new PDO($dsn, $config['username'], $config['password']);
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
}   