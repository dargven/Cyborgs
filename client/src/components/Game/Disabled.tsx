import { SpriteAnimator, useKeyboardControls } from "@react-three/drei";
import { BallCollider, RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import HealthBar from "./HealthBar";
import { useFrame } from "@react-three/fiber";
import { TPlayer } from "../../modules/Server/types";
import { TPlayerProps } from "./Player";

const Disabled = ({
    x,
    y,
    vx,
    vy,
    dx,
    dy,
    hp = 100,
    token,
    teamId,
}: TPlayer) => {

    const ref = useRef<RapierRigidBody>(null!);

    // useEffect(() => {
    //     if (ref.current) {
    //         ref.current.setTranslation(new Vector3(x, y), true);
    //         ref.current.setLinvel(new Vector3(vx, vy, 0), true);
    //         console.log(ref.current.linvel());
    //     }

    // }, []);

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
                linearVelocity={[vx, 0, 4]}
            >

                <BallCollider args={[0.5]} />

                <SpriteAnimator
                    fps={10}
                    startFrame={0}
                    loop={true}
                    autoPlay={true}
                    textureImageURL={'./assets/test/Sprite-0001.png'}
                    textureDataURL={'./assets/test/Sprite-0001.json'}
                    alphaTest={0.01}
                />
                <HealthBar value={hp} color={0xff0000} />
            </RigidBody>
        </>
    );
}

export default Disabled;
