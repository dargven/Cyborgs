<?php

class User {
    function __construct($db){
        $this->db = $db;
    }

    function login($login, $password): array
    {
        if($login === 'Vasya' && $password === '1234'){
            return [
                'name'=>'Vasya',
                'soname'=>'Petrov',
                'id'=>12,
            ];
        }
        return array(false, 1002);
    }
}
