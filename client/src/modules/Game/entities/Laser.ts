import { Vector3 } from "three";

export interface ILaser {
	position: Vector3;
	aimingPoint: Vector3;
	key: string;
	damage: number;
	team: number;
}

class Laser implements ILaser {
	position: Vector3;
	aimingPoint: Vector3;
	key: string;
	damage: number;
	team: number;
	constructor(position: Vector3 = new Vector3(), direction: Vector3 = new Vector3(), key: string, damage: number, team: number) {
		this.position = position;
		this.aimingPoint = direction;
		this.key = key;
		this.damage = damage;
		this.team = team;	
	}
}

export default Laser;