import { Animator } from "../Sprites/Animator";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import HealthBar from "./HealthBar";
import { TPlayer } from "../../../modules/Server/types";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

const Dummy = ({
    x,
    y,
    vx,
    vy,
    dx,
    dy,
    teamId,
    token,
    hp,
}: TPlayer) => {

    const ref = useRef<RapierRigidBody>(null!);

    return (
        <group>
            <RigidBody
                ref={ref}
                scale={0.5}
                position={[x, y, 0]}
                colliders="hull"
                friction={1}
                linearDamping={10}
                angularDamping={1}
                lockRotations
                linearVelocity={[vx, vy, 0]}
            >

                <Animator
                    fps={2}
                    startFrame={0}
                    loop={true}
                    autoPlay={true}
                    textureImageURL={'./assets/test/Sprite-0001.png'}
                    textureDataURL={'./assets/test/Sprite-0001.json'}
                    alphaTest={0.01}
                />

                {/* <BallCollider args={[0.5]} restitution={0}
                    onIntersectionEnter={(e) => {
                        const data: any = e.other.rigidBody?.userData;
                        if (data.type === "projectile") {
                            const damage = data.team === teamId ? data.damage / 2 : data.damage;
                            if (hp - damage < 0) {
                                setState({ ...state, hp: 0 });
                            } else {
                                setState({ ...state, hp: hp - damage });
                            }
                        }
                    }} /> */}
                <HealthBar value={hp} color={0xff0000} />
            </RigidBody>
        </group>
    );
}

export default Dummy;
