import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { Texture } from "three/src/textures/Texture";
import { Animator } from "./sprites/Animator";

interface IProjectiileProps {
    initialSpeed: number;
    direction: Vector3;
    initialPosition: Vector3;
    texture: Texture;
    damage: number;
    team: number;
}

const Projectile = ({ initialSpeed, direction, initialPosition, damage, texture, team }: IProjectiileProps) => {
    const bulletRef = useRef<RapierRigidBody>(null!);
    const [isActive, setActive] = useState<boolean>(true);
    // const _texture = texture.clone();
    // _texture.rotation = Math.atan2(direction.y, direction.x);

    useEffect(() => {
        direction.setLength(initialSpeed)
        bulletRef.current.setLinvel(direction, true);
    }, []);

    return (
        <RigidBody
            ref={bulletRef}
            lockRotations
            angularDamping={1}
            position={initialPosition}
            ccd
            restitution={0}
            userData={{
                type: 'projectile',
                damage: damage,
                team: team,
            }}>
            {isActive ? <group>
                <BallCollider
                    args={[0.1]}
                    restitution={0}
                    sensor
                    onIntersectionEnter={(e) => {
                        const data: any = e.other.rigidBody?.userData;
                        if (data.type === "player" || data.type === "collider") {
                            bulletRef.current.setEnabled(false);
                            setActive(false);
                        }
                    }} />
                <Animator
                    textureImageURL={'./assets/bullets/Projectile.png'}
                    scale={0.5}
                    materialRotation={Math.atan2(direction.y, direction.x)}
                />
            </group> : <></>}
        </RigidBody>
    );
}

export default Projectile;