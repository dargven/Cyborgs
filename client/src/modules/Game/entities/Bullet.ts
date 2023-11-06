import { Vector3 } from "three";

export interface IBullet {
    speed: number;
    position: Vector3;
    direction: Vector3;
    key: string;
    damage: number;
    team: number;
}

class Bullet implements IBullet {
    speed: number;
    position: Vector3;
    direction: Vector3;
    key: string;
    damage: number;
    team: number;
    constructor(speed: number = 10, position: Vector3 = new Vector3(), direction: Vector3 = new Vector3(), key: string, damage: number = 25, team:number) {
        this.speed = speed;
        this.position = position;
        this.direction = direction;
        this.key = key;
        this.damage = damage;
        this.team=team;
    }
}

export default Bullet;