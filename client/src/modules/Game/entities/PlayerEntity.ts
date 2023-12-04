import { Vector3 } from "three";

interface IPlayer {
    token: string;
    position: Vector3;
    velocity: Vector3;
}

class PlayerEntity implements IPlayer {
    token: string;
    position: Vector3;
    velocity: Vector3;
    constructor(token: string, position: Vector3, velocity = new Vector3()) {
        this.token = token;
        this.position = position;
        this.velocity = velocity;
    }
}

export default PlayerEntity;