import { NearestFilter } from "three/src/constants";
import { Vector3 } from "three";
import { Texture } from "three";

export interface IMakeSprite {
    texture: Texture;
    position?: Vector3;
    scale?: number;
    rotation?: number;
}

const MakeSprite = ({ texture, position, scale = 1, rotation = 0 }: IMakeSprite) => {
    texture.magFilter = NearestFilter;
    texture.minFilter = NearestFilter;
    texture.rotation = rotation;

    return (
        <mesh position={position} scale={[scale, scale, scale]}>
            <planeGeometry attach="geometry" args={[1, 1, 4]} />
            <meshStandardMaterial attach="material" map={texture} alphaTest={0.5} />
        </mesh>
    )
}

export default MakeSprite;