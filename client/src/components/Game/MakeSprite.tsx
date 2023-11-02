import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { NearestFilter } from "three/src/constants";
import { Vector3 } from "three/src/math/Vector3";
import { Texture } from "three/src/textures/Texture";

export interface IMakeSprite {
    texture: Texture;
    position?: Vector3;
    scale?: number;
    rotation?: number;
    isSphere?: boolean;
    isCollider?: boolean;
    colliderSize?: number[];
}

const MakeSprite = ({ texture, position, scale = 1, isSphere = false, isCollider = true, rotation }: IMakeSprite) => {
    texture.magFilter = NearestFilter;
    texture.minFilter = NearestFilter;

    return (
        <mesh position={position} scale={[scale, scale, scale]}>
            <mesh>
                <planeGeometry attach="geometry" args={[1, 1, 4]} />
                <meshLambertMaterial attach="material" map={texture} alphaTest={0.5} />
            </mesh>
            {isCollider &&
                <RigidBody 
                    type="fixed"
                    userData={{
                        type: "Collider"
                    }}>
                    <CuboidCollider args={[0.5, 0.5, 0.5]} ></CuboidCollider>
                </RigidBody>
            }
        </mesh>
    )
}

export default MakeSprite;