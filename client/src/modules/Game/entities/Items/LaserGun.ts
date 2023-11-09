import { Vector3 } from "three";
import Laser, { ILaser } from "../Laser";
import Item, { IItem } from "./Item";

interface ILaserGun extends IItem {
    damage: number;
    rate: number;
    magSize: number;
    maxAmmo: number;
    currentAmmo: number;
    speed: number;
}

class LaserGun extends Item {
    damage: number;
    rate: number;
    magSize: number;
    maxAmmo: number;
    currentAmmo: number;
    speed: number;

    constructor({ name, type, damage, rate, magSize, maxAmmo, speed, currentAmmo }: ILaserGun) {
        super(name, type,);
        this.damage = damage;
        this.rate = rate;
        this.magSize = magSize;
        this.maxAmmo = maxAmmo;
        this.currentAmmo = currentAmmo;
        this.speed = speed;
    }

    use(position: Vector3, aimingPoint: Vector3, key: string): Laser | null {
        if (this.currentAmmo > 0) {
            this.currentAmmo--;
            return new Laser(position, aimingPoint, key);
        }
        return null;
    }
}

export default LaserGun;