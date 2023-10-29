import MakeSprite from "./MakeSprite";
import { Vector3, Mesh, Texture } from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";

interface IProjectiileProps {
    initialSpeed?: number;
    direction: Vector3;
    initialPosition: Vector3;
    texture: Texture;
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
        >
            <sprite scale={0.5}>
                <spriteMaterial map={props.texture} />
            </sprite>
            {isActive ? <BallCollider args={[0.1]} restitution={0} sensor/> : <></>}
        </RigidBody>
    );
}

export default Projectile;