import { Vector3 } from "three/src/math/Vector3";
import { CuboidArgs } from "@react-three/rapier/dist/declarations/src/types";
import { Texture } from "three";

export interface ICollider {
    position: Vector3;
    args: CuboidArgs;
    isDestructible?: boolean;
    texture?: Texture;
}

class Collider implements ICollider {
    position: Vector3;
    args: CuboidArgs;
    isDestructible?: boolean;
    texture?: Texture;

    constructor(position: Vector3 = new Vector3(), args: CuboidArgs, isDestructible = false, texture?: Texture) {
        this.position = position;
        this.args = args;
        this.isDestructible = isDestructible;
        this.texture = texture;
    }
}

export default Collider;