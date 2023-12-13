import { SpriteAnimator, useKeyboardControls } from "@react-three/drei";
import { BallCollider, RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import HealthBar from "./HealthBar";
import { useFrame } from "@react-three/fiber";
import { TPlayer } from "../../modules/Server/types";
import { TPlayerProps } from "./Player";

export interface DisabledProps {
    x: number;
    y: number;
    hp: number
}

const Disabled = ({
    x = 0,
    y = 0,
    hp = 100,
}: DisabledProps) => {

    const ref = useRef<RapierRigidBody>(null!);

    const [state, setState] = useState<DisabledProps>({
        x: vec3(ref.current?.translation()).x,
        y: vec3(ref.current?.translation()).y,
        hp : 0,
    });

    useEffect(() => {
        const data = {
            type: 'Disabled',
            hp: state.hp,
        }

        ref.current.userData = data;

        if (state.hp === 0) {
            ref.current.setEnabled(false);
        }

    }, [state]);

    return (
        <>
            <RigidBody
                ref={ref}
                scale={0.5}
                position={[x,y,0]}
                colliders="hull"
                friction={1}
                linearDamping={10}
                angularDamping={1}
                lockRotations
            >

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
