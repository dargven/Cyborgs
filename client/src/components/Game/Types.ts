import { BoxGeometryProps, Euler } from "@react-three/fiber";
import { BoxGeometry, Texture, Vector3 } from "three";

export{};

export type TSprite = {
    texture: Texture;
    position: Vector3;
    scale?: number;
    rotation?: Euler;
    isCollider?: boolean;
    colliderSize?: number[];
}

export type TMap = {
    scale?: number
}

export type TMakeCollider = {
    size?: number[];
    edgeWidth: number;
}