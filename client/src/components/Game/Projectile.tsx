import { Vector3, Texture } from "three";
import { useEffect, useRef, useState } from "react";
import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";

interface IProjectiileProps {
    initialSpeed?: number;
    direction: Vector3;
    initialPosition: Vector3;
    texture: Texture;
    //damage
}

const Projectile = (props: IProjectiileProps) => {
    // console.log(props.initialPosition)
    const bulletRef = useRef<RapierRigidBody>(null!);
    const [isActive, setActive] = useState<boolean>(true);

    // const [speed, setSpeed] = useState<number>(props.initialSpeed ? props.initialSpeed : 10);

    useEffect(() => {
        bulletRef.current.addForce(props.direction, true);
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
            }}
        >
            <sprite scale={0.5}>
                <spriteMaterial map={props.texture} />
            </sprite>
            {isActive ? <BallCollider
                args={[0.1]}
                restitution={0}
                sensor
                onIntersectionEnter={(e) => {
                    // console.log(e);
                    const data: any = e.other.rigidBody?.userData;
                    if (data.type) {
                        console.log(data.type);
                    }
                }}
            /> : <></>}
        </RigidBody>
    );
}

export default Projectile;