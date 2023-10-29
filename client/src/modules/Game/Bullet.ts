import { Vector3 } from "three";

export interface IBullet {
    speed: number;
    position: Vector3;
    direction: Vector3;
    key: string;
}

class Bullet implements IBullet {
    speed: number;
    position: Vector3;
    direction: Vector3;
    key: string;
    constructor(speed: number = 100, position: Vector3 = new Vector3(), direction: Vector3 = new Vector3(), key: string) {
        this.speed = speed;
        this.position = position;
        this.direction = direction;
        this.key = key;
    }
}

export default Bullet;