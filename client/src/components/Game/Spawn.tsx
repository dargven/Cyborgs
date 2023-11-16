import { CuboidCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from 'react';
import { Vector3 } from "three";
interface ISpawnProps {
    position: Vector3;
}




function Spawn({ position }: ISpawnProps) {
    const ref = useRef<RapierRigidBody>(null!);

    return (
        <RigidBody
            ref={ref}
            userData={{
                type: "spawn"
            }}
        >

            <group position={position}>
                <CuboidCollider
                    args={[1, 1, 0.5]}
                    sensor
                    />
            </group>
        </RigidBody>
    )
}

export default Spawn;