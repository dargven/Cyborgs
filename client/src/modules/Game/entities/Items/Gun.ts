import { Vector3 } from "three";
import Bullet, { IBullet } from "../Bullet";
import Item, { IItem } from "./Item";

interface IGun extends IItem {
    damage: number;
    rate: number;
    magSize: number;
    maxAmmo: number;
    currentAmmo: number;
    speed: number;
}

class Gun extends Item {
    damage: number;
    rate: number;
    magSize: number;
    maxAmmo: number;
    currentAmmo: number;
    speed: number;

    constructor({ name, type, damage, rate, magSize, maxAmmo, speed, currentAmmo }: IGun) {
        super(name, type,);
        this.damage = damage;
        this.rate = rate;
        this.magSize = magSize;
        this.maxAmmo = maxAmmo;
        this.currentAmmo = currentAmmo;
        this.speed = speed;
    }

    use(position: Vector3, direction: Vector3, key: string): Bullet | null {
        if (this.currentAmmo > 0) {
            this.currentAmmo--;
            return new Bullet(this.speed, position, direction, key, this.damage);
        }
        return null;
    }
}

export default Gun;