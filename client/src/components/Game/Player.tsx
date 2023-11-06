import { SpriteAnimator } from "@react-three/drei";
import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Ref, forwardRef, useState } from "react";
import { Vector3 } from "three";
import HealthBar from "./HealthBar";

export interface IPlayerProps {
    id?: number;
    username?: string;
    position?: Vector3;
    isMoving?: boolean;
    team:number;
}

const Player = forwardRef(({ id, username, position, isMoving,team }: IPlayerProps, ref: Ref<RapierRigidBody>) => {

    const [hp, setHp] = useState<number>(100);
    const data = {
        type: 'player',
        team: team
    }

    return (
        <>
            <RigidBody
                ref={ref}
                scale={0.5}
                position={[-2, 0, 0]}
                colliders="hull"
                friction={1}
                linearDamping={10}
                angularDamping={1}
                lockRotations
                userData={data}
            >

                <SpriteAnimator
                    fps={2}
                    startFrame={0}
                    loop={true}
                    autoPlay={true}
                    textureImageURL={'./assets/test/Sprite-0001.png'}
                    textureDataURL={'./assets/test/Sprite-0001.json'}
                    alphaTest={0.01}
                    pause={!isMoving}
                />

                <BallCollider args={[0.5]} restitution={0} 
                    onIntersectionEnter={(e) => {

                        const data: any = e.other.rigidBody?.userData;
                        if (data.type === "projectile") {
                            if(data.team === team && hp - data.damage < 0)
                            {
                                setHp(0)
                            }
                            else if (data.team === team) {
                                setHp(hp - (data.damage/10))
                            }
                            else if(hp - data.damage < 0) {
                                setHp(0)
                            }
                            else{
                                setHp(hp - data.damage)
                            }
                        }
                    }} />
                <HealthBar value={hp} color={0xff0000} />
            </RigidBody>
        </>
    );
});

export default Player;
