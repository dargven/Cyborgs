import { CuboidArgs } from "@react-three/rapier";

import { Vector3 } from "three";

export interface ICollider {
    position: Vector3;
    args: CuboidArgs;
    key?: string;
}

class Collider implements ICollider {
    position: Vector3;
    args: CuboidArgs;
    key: string;
    constructor(position: Vector3 = new Vector3(), args: CuboidArgs, key: string = 'none') {
        this.position = position;
        this.args = args;
        this.key = key;
    }
}

export default Collider;