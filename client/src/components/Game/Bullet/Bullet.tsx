import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { Texture } from "three/src/textures/Texture";
import { TBullet } from "../../../modules/Server/types";

type TBulletProps = {
    texture: Texture;
} & TBullet;

const Bullet = ({ x, y, vx, vy, texture }: TBulletProps) => {
    const bulletRef = useRef<RapierRigidBody>(null!);
    const [isActive, setActive] = useState<boolean>(true);

    useEffect(() => {
        bulletRef.current.setLinvel(new Vector3(vx, vy), true);
    }, []);

    return (
        <RigidBody
            ref={bulletRef}
            lockRotations
            angularDamping={1}
            position={[x, y, 0]}
            ccd
            restitution={0}
            userData={{
                type: 'projectile'
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
                    }}
                />
                <sprite scale={0.5}>
                    <spriteMaterial map={texture} />
                </sprite>
            </group> : <></>}
        </RigidBody>
    );
}

export default Bullet;