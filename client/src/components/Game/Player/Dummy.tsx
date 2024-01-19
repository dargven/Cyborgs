import { Animator } from "../Sprites/Animator";
import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import HealthBar from "./HealthBar";
import { TPlayer } from "../../../modules/Server/types";
import { useRef, useState } from "react";

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

    const [frameName, setFrameName] = useState('movement')

    const onEnd = ({}) => {
        if (hp) {
            setFrameName('movement')
          } else {
            setFrameName('corpse')
          }
    }

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
                    fps={5}
                    startFrame={0}
                    loop={true}
                    onLoopEnd={onEnd}
                    frameName={frameName}
                    animationNames={['movement','corpse']}
                    autoPlay={true}
                    textureImageURL={'./assets/test/Cop.png'}
                    textureDataURL={'./assets/test/Cop.json'}
                    alphaTest={0.01}
                    materialRotation={Math.atan2(dy,dx)}
                />


                {/* <BallCollider
                
                    args={[0.5]}
                    restitution={0}
                    onIntersectionEnter={(e) => {
                        const data: any = e.other.rigidBody?.userData;
                        if (data.type === "projectile") {
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
