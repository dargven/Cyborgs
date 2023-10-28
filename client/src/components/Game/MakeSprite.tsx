import { MeshStandardMaterial, PlaneGeometry, DoubleSide } from "three";
import * as THREE from "three";
import { Texture, Vector3 } from "three";
import { Euler } from "@react-three/fiber"
import { CuboidCollider } from "@react-three/rapier";
interface IMakeSprite {
    texture: Texture;
    position: Vector3;
    scale?: number;
    rotation?: number;
    isSphere?: boolean;
    isCollider?: boolean;
    colliderSize?: number[];
}

const MakeSprite = ({ texture, position, scale = 1, isSphere = false, isCollider = true, rotation }: IMakeSprite) => {

    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;

    // const planeGeometry = new PlaneGeometry(1, 1);
    // const planeMaterial = new MeshStandardMaterial({ map: texture, transparent: true, side: DoubleSide });

    return (
        <mesh position={position} scale={[scale, scale, scale]}>
            {/* <meshStandardMaterial map={texture} transparent />
            <primitive object={planeGeometry} material={planeMaterial} /> */}
            <sprite>
                <spriteMaterial map={texture} rotation={rotation} />
            </sprite>
            {/* {isCollider && <MakeCollider isSphere={isSphere} />} */}
            {isCollider && <CuboidCollider args={[0.5, 0.5, 0.5]}></CuboidCollider>}
        </mesh>
    )
}

export default MakeSprite;