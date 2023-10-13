<?php

class User
{
    private $id;

    function __construct($db)
    {
        $this->db = $db;
    }

    function login($login, $password): array // Дописать логин, здесь будет ипсользоваться getuser. Максим.
    {
        if ($login === 'Vasya' && $password === '1234') {
            return [
                'name' => 'Vasya',
                'soname' => 'Petrov',
                'id' => 12,
            ];

            //$this->id = $id;
        }
        return array(false, 1002);
    }

    function logout($id) //Дописать. Арина.
    {
    }
}
