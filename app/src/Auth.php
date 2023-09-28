<?php
    $login = filter_var(trim($_POST['login']),
    FILTER_SANITIZE_STRING);

    $password = filter_var(trim($_POST['password']),
    FILTER_SANITIZE_STRING);

    $password = md5($password."ewrerewfdsfsfjefjqwjrfbjqwebkqe32");
    

    $mysql = new mysqli('localhost','root','root','regist');
    $mysql->query("INSERT INTO `Users` (`login`, `password`) 
        VALUES('$login','$password')");

    $mysql->close();

    header('Location: /');
?>