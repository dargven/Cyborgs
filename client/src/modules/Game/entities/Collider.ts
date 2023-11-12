import { Vector3 } from "three/src/math/Vector3";
import { CuboidArgs } from "@react-three/rapier/dist/declarations/src/types";

export interface ICollider {
    position: Vector3;
    args: CuboidArgs;
    isDestroyable?: boolean;
}

class Collider implements ICollider {
    position: Vector3;
    args: CuboidArgs;
    isDestroyable?: boolean;

    constructor(position: Vector3 = new Vector3(), args: CuboidArgs, isDestroyable = false) {
        this.position = position;
        this.args = args;
        this.isDestroyable = isDestroyable;
    }
}

export default Collider;