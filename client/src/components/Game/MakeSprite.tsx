import { NearestFilter } from "three/src/constants";
import { Vector3 } from '@react-three/fiber'
import { Texture } from "three/src/textures/Texture";

export interface IMakeSprite {
    texture: Texture;
    position?: Vector3;
    scale?: Vector3;
    rotation?: number;
    children?: React.ReactNode;
}

const MakeSprite = ({ texture, position, scale, rotation = 0 }: IMakeSprite) => {
    texture.magFilter = NearestFilter;
    texture.minFilter = NearestFilter;
    texture.rotation = rotation;

    return (
        <mesh position={position} scale={scale}>
            <planeGeometry attach="geometry" args={[1, 1, 4]} />
            <meshStandardMaterial attach="material" map={texture} alphaTest={0.5} />
        </mesh>
    )
}

export default MakeSprite;