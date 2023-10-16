<?php

class User
{
    private int $id = 1;
    private $db;
    function __construct($db)
    {
        $this->db =  new DB();
    }

    function login($login, $hash, $rnd)
    {//Настроить запрос из базы данных
        $hashPassword = $this->db->getUser($this->id,'hashPassword');
        $hashs = md5($hashPassword . $rnd);
        if ($hash === $hashs) {
            $token = md5($hash . rand());
            return array(
                'name' => 'Vasya',
                'soname' => 'Petrov',
                'token' => $token,
            ); // Настроить вывод из базы данных по Id
        }
        return array(false, 1002);
    }

    public function reg($login, $password,  $hash=0)
    {
       $id = $this->id + 1;
       $this->id += 1;
       $token = md5(rand());
       $hash = md5($login . $password);
       $this->db->addUser($id, $login, $hash, $token);
       $flag = true;
       if($flag) {
           return array(
               'login' => $login,
               'password' => $password,
               'lasdf'=>'lasdf'
           );
       }
       return [false,1001];
    }
}

//private function userExists($userId)
//    {
//        $sql = "SELECT id FROM users WHERE id = :userId";
//        $stmt = $this->db->prepare($sql);
//
//        if (!$stmt) {
//            return [false, 500];
//        }
//
//        $stmt->execute(['userId' => $userId]);
//
//        if ($stmt->fetchColumn() !== false) {
//            return true;
//        } else {
//            return [false, 404];
//        }
//    }
//
//    private function validateToken($userId, $token)
//    {
//        $sql = "SELECT token FROM users WHERE id = :userId";
//        $stmt = $this->db->prepare($sql);
//
//        if (!$stmt) {
//            return [false, 500];
//        }
//
//        $stmt->execute(['userId' => $userId]);
//        $userToken = $stmt->fetchColumn();
//
//        if ($userToken === $token) {
//            return true;
//        } else {
//            return [false, 401];
//        }
//    }
//
//    private function invalidateToken($userId)
//    {
//        $sql = "UPDATE users SET token = NULL WHERE id = :userId";
//        $stmt = $this->db->prepare($sql);
//
//        if (!$stmt) {
//            return [false, 500];
//        }
//
//        $stmt->execute(['userId' => $userId]);
//        return true; //токен обнулен
//    }
//    public function logout($userId, $token)
//{
//        $userExists = $this->userExists($userId);
//        $tokenValid = $this->validateToken($userId, $token);
//
//        if ($userExists && $tokenValid) {
//            $tokenInvalidated = $this->invalidateToken($userId);
//            if ($tokenInvalidated) {
//                return null;
//            } else {
//                return [false, 500];
//            }
//        } elseif (!$userExists) {
//            return [false, 404];
//        } elseif (!$tokenValid) {
//            return [false, 401];
//        }
