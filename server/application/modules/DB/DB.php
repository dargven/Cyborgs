<?php
require_once('application/modules/DB/Bullet.php');
class DB {
   // $hashPassword=md5($login.’1234’);

   public function addUser($id,$login,$hashPassword,$token){
        $this -> UsersData[] = array(
            'id'=>$id,
            'login'=>$login,
            'hashPassword'=>$hashPassword,
            'token'=>$token);
    }
    
    public function addBullets($bulletId,$Bullet) {
        $this -> BulletData[] = array(
            'bulletId'=>$bulletId,
            'Bullet'=>$Bullet
        );
    }
    
    public function addScene($scene){
        $this -> $SceneData[] = array(
            'scene'=>$scene,
        );
    }
}
