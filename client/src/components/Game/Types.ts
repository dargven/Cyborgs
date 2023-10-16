import { Euler } from "@react-three/fiber";
import { Vector3 } from "three";

export{};

export type TSprite = {
    texture: string;
    position: Vector3;
    scale?: number;
    rotation?: Euler;
}

export type TMap = {
    scale?: number
}