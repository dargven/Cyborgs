import { Vector3 } from "three";
import Laser, { ILaser } from "../entities/Laser";
import Item, { IItem } from "./Item";

interface ILaserGun extends IItem {
    damage: number;
    currentAmmo: number;
}

class LaserGun extends Item {
    damage: number;
    currentAmmo: number;

    constructor({ name, type, damage, currentAmmo }: ILaserGun) {
        super(name, type,);
        this.damage = damage;
        this.currentAmmo = currentAmmo;
    }

    fire(position: Vector3, aimingPoint: Vector3, key: string): Laser | null {
        if (this.currentAmmo > 0) {
            this.currentAmmo--;
            return new Laser(position, aimingPoint, key);
        }
        return null;
    }
}

export default LaserGun;