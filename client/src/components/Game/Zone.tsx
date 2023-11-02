import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useState } from 'react';

function Zone() {
    const [time, setTime] = useState<number>(0);

    return (

        <RigidBody
            userData={{
                type: "Zone"
            }}>
            <group position={[5.5, 7.5, 0.5]}>
                <CuboidCollider args={[1, 1, 0.5]} sensor
                    onIntersectionEnter={(e) => {
                        const data: any = e.other.rigidBody?.userData;
                        if (data.type === "player") {
                            setTime(Date.now())
                        }
                    }}
                    onIntersectionExit={(e) => {
                        const data: any = e.other.rigidBody?.userData;
                        if (data.type === "player") {
                            const left = Date.now()
                            const score = Math.floor((left - time) / 1000)
                            console.log(score)
                        }
                    }}/>
            </group>
        </RigidBody>

    )
}

export default Zone;