import { Vector3 } from "three";

export interface ILaser {
	position: Vector3;
	aimingPoint: Vector3;
	key: string;
}

class Laser implements ILaser {
	position: Vector3;
	aimingPoint: Vector3;
	key: string;
	constructor(position: Vector3 = new Vector3(), aimingPoint: Vector3 = new Vector3(), key: string) {
		this.position = position;
		this.aimingPoint = aimingPoint;
		this.key = key;
	}
}

export default Laser;