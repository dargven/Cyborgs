<?php

class User
{
    private $id;
    private $db;
    function __construct($db)
    {
        $this->db = $db;
    }

    function login($login, $hash, $rnd)
    {
        $hashs = (md5($login . '1234') . $rnd);
        if ($hash === $hashs) {
            $token = md5($hash . rand());
            return array(
                'login' => $login,
                'hash l+p' => $hash,
                'token' => $token,
            );
        }
        return array(false, 1002);
    }

    private function userExists($userId)
    {
        $sql = "SELECT id FROM users WHERE id = :userId";
        $stmt = $this->db->prepare($sql);

        if (!$stmt) {
            return [false, 500]; 
        }

        $stmt->execute(['userId' => $userId]);

        if ($stmt->fetchColumn() !== false) {
            return true; 
        } else {
            return [false, 404]; 
        }
    }

    private function validateToken($userId, $token)
    {
        $sql = "SELECT token FROM users WHERE id = :userId";
        $stmt = $this->db->prepare($sql);

        if (!$stmt) {
            return [false, 500]; 
        }

        $stmt->execute(['userId' => $userId]);
        $userToken = $stmt->fetchColumn();

        if ($userToken === $token) {
            return true; 
        } else {
            return [false, 401]; 
        }
    }

    private function invalidateToken($userId)
    {
        $sql = "UPDATE users SET token = NULL WHERE id = :userId";
        $stmt = $this->db->prepare($sql);

        if (!$stmt) {
            return [false, 500]; 
        }

        $stmt->execute(['userId' => $userId]);
        return true; //токен обнулен
    }
    public function logout($userId, $token)
    {
        $userExists = $this->userExists($userId);
        $tokenValid = $this->validateToken($userId, $token);

        if ($userExists && $tokenValid) {
            $tokenInvalidated = $this->invalidateToken($userId);
            if ($tokenInvalidated) {
                return null; 
            } else {
                return [false, 500]; 
            }
        } elseif (!$userExists) {
            return [false, 404]; 
        } elseif (!$tokenValid) {
            return [false, 401]; 
        }
    }
}

    
