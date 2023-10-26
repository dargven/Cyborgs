<?php
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
