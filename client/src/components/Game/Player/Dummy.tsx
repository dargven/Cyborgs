import { SpriteAnimator, useKeyboardControls } from "@react-three/drei";
import { BallCollider, RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import HealthBar from "../HealthBar";
import { useFrame } from "@react-three/fiber";
import { TPlayer } from "../../../modules/Server/types";

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

    // const [state, setState] = useState<TPlayer>({
    //     x,
    //     y,
    //     vx,
    //     vy,
    //     dx,
    //     dy,
    //     hp,
    //     token,
    //     teamId,
    // });

    return (
        <>
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

                <SpriteAnimator
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
        </>
    );
}

export default Dummy;
