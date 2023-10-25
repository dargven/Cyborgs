import { MeshStandardMaterial, PlaneGeometry, DoubleSide } from "three";
import * as THREE from "three";
import { Texture, Vector3 } from "three";
import { Euler } from "@react-three/fiber"

interface IMakeSprite {
    texture: Texture;
    position: Vector3;
    scale?: number;
    rotation?: Euler;
    isCollider?: boolean;
    colliderSize?: number[];
}

const MakeSprite = ({ texture, position, scale=1, isCollider=true, colliderSize=[1, 1, 0.1], rotation}: IMakeSprite) => {

    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;

    const planeGeometry = new PlaneGeometry(1, 1);
    const planeMaterial = new MeshStandardMaterial({ map: texture, transparent: true, side: DoubleSide});

    return(
        <mesh position={position} scale={[scale, scale, scale]} rotation={rotation}>
            <meshBasicMaterial map={texture} transparent />
            <primitive object={planeGeometry} material={planeMaterial} /> 
        </mesh>
    )
}

export default MakeSprite;