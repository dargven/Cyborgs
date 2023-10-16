import { Vector3 } from "three";

export{};

export type TSprite = {
    texture: string;
    position: Vector3;
    scale?: number;
}

export type TMap = {
    scale?: number
}