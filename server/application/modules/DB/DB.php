<?php

class DB
{
    //сохраняет соединение с ДБ
    private $pdo;

    //вызов соединения с БД
    public function __construct()
    {
        $this->pdo = new PDO("mysql:host=localhost;dbname=Cyborgs;charset=utf8", 'root', '123');
    }

    public function __destruct()
    {
        $this->pdo = null;
    }


    //ф-ция, которая выполняет запрос
    public function execute($sql)
    {
        $sth = $this->pdo->prepare($sql);
        return $sth->execute();
    }

    //получение рез-та
    public function query($sql)
    {
        $sth = $this->pdo->prepare($sql);
        $sth->execute();
        $result = $sth->fetchAll(PDO::FETCH_ASSOC);
        if ($result === false) {
            return [];
        }
        return $result;

    }

    public function addUser($login, $password)
    {
        $user = $this->execute("INSERT INTO `Users` (login,password,name,soname,token)
        VALUES ('$login','$password')"
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

    public function getScoreTeams()
    {
        return $this->execute("SELECT team_id, team_score FROM Teams group by team_id");
    }

    public function getCountOfPlayersInTeams()
    {
        return $this->query("SELECT team_id, COUNT(user_id) as countOfPlayers from UserTeams group by team_id");

    }

    public function updateScoreInTeam($teamId, $score)
    {
        return $this->execute("UPDATE Teams SET WHERE team_id = '$teamId', team_points= SUM(team_points,) ");
    }

    public function addPlayerToTeam($id, $teamId)
    {
       $this->execute("INSERT INTO UserTeams (team_id, user_id) VALUES ('$teamId', '$id')");
    }


}

