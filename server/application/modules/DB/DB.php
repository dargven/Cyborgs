<?php

class DB
{
    //сохраняет соединение с ДБ
    private $pdo;

    //вызов соединения с БД
    function __construct() { 
        $host = '127.0.0.1';
        $port = 3306;
        $user = 'root';
        $pass = '';
        $db = 'cyborgs';
        // Локальная:    
        $connect = "mysql:host=$host;port=$port;dbname=$db;charset=utf8";
        $this->pdo = new PDO($connect, $user, $pass);
        //$this->pdo = new PDO("mysql:host=dargvetg.beget.tech;dbname=dargvetg_cyborgs;charset=utf8", 'dargvetg_cyborgs', 'vizual22cdxsaV');
    }

    function __destruct() {
        $this->pdo = null;
    }

    /*
            $sth = $dbh->prepare('SELECT name, colour, calories
            FROM fruit
            WHERE calories < ? AND colour = ?');
        $sth->execute([150, 'red']);
    */

    // выполнить запрос без возвращения данных
    private function execute($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        return $sth->execute($params);
    }

    // получение ОДНОЙ записи
    private function query($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetch(PDO::FETCH_OBJ);
    }

    // получение НЕСКОЛЬКИХ записей
    private function queryAll($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetchAll(PDO::FETCH_OBJ);
    }

    /*************************/
    /* НЕПОВТОРИМЫЙ ОРИГИНАЛ */
    /*************************/
    public function getUserByLogin($login) {
        return $this->query("SELECT * FROM users WHERE login=?", [$login]);
    }

    public function getUserByToken($token) {
        return $this->query("SELECT * FROM users WHERE token=?", [$token]);
    }

    public function getUserById($id) {
        return $this->query("SELECT * FROM users WHERE id=?", [$id]);
    }

    public function updateToken($id, $token) {
        return $this->execute("UPDATE users SET token=? WHERE id=?", [$token, $id]);
    }

    public function addUser($login, $password) {
        $this->execute(
            "INSERT INTO users (login,password) VALUES (?, ?)", 
            [$login, $password]
        );
    }

    /******************/
    /* ЖАЛКАЯ ПАРОДИЯ */
    /******************/
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
        return $this->execute("UPDATE Teams SET WHERE team_id = '$teamId', team_score= SUM(team_score,) ");
    } // Дописать Кирилл || Женя

    public function addPlayerToTeam($id, $teamId)
    {
        $this->execute("INSERT INTO UserTeams (team_id, user_id) VALUES ('$teamId', '$id')");
    }

    public function getSkins($id)
    {
        return $this->query("SELECT skin_id, text FROM UserSkins, Skins WHERE user_id='$id'");
    }

    public function setSkin($id, $skinId)
    {
        return $this->execute("UPDATE UserSkins SET  skin_id='$skinId' WHERE id='$id'");
    }


}

