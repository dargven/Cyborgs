import { Vector3 } from "three";

export interface IBullet {
    speed: number;
    position: Vector3;
    direction: Vector3;
    key: string;
    damage: number;
}

class Bullet implements IBullet {
    speed: number;
    position: Vector3;
    direction: Vector3;
    key: string;
    damage: number;
    constructor(speed: number = 10, position: Vector3 = new Vector3(), direction: Vector3 = new Vector3(), key: string, damage: number = 25) {
        this.speed = speed;
        this.position = position;
        this.direction = direction;
        this.key = key;
        this.damage = damage;
    }
}

export default Bullet;