import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three/src/math/Vector3";
import { Texture } from "three/src/textures/Texture";

interface IProjectiileProps {
    initialSpeed: number;
    direction: Vector3;
    initialPosition: Vector3;
    texture: Texture;
    //damage
}

const Projectile = (props: IProjectiileProps) => {
    const bulletRef = useRef<RapierRigidBody>(null!);
    const [isActive, setActive] = useState<boolean>(true);

    // const [speed, setSpeed] = useState<number>(props.initialSpeed ? props.initialSpeed : 10);

    useEffect(() => {
        props.direction.setLength(props.initialSpeed)
        bulletRef.current.setLinvel(props.direction, true);
        // console.log(props.direction)
    });

    return (
        <RigidBody
            ref={bulletRef}
            lockRotations
            angularDamping={1}
            position={props.initialPosition}
            userData={{
                type: 'projectile',
                damage: 10
            }}>
                {isActive ? <group>
                    <BallCollider
                        args={[0.1]}
                        restitution={0}
                        sensor
                        onIntersectionEnter={(e) => {
                            const data: any = e.other.rigidBody?.userData;
                            if (data.type === "player" || data.type === "Collider") {
                                setActive(false);
                            }
                        }}/>
                    <sprite scale={0.5}>
                        <spriteMaterial map={props.texture} />
                    </sprite>
                </group> : <></>}
        </RigidBody>
    );
}

export default Projectile;