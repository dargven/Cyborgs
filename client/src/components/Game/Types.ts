import { BoxGeometryProps, Euler } from "@react-three/fiber";
import { BoxGeometry, Vector3 } from "three";

export{};

export type TSprite = {
    texture: string;
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