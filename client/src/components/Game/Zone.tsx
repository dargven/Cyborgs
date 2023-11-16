import { CuboidCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from 'react';
import { Vector3 } from "three";
import ContestZone from "../../modules/Game/misc/ContestZone";

interface IZoneProps {
    position: Vector3;
}

export interface IZonePlayer {
    team: 0 | 1;
    hp: number;
    id: number;
}


function Zone({ position }: IZoneProps) {

    const ref = useRef<RapierRigidBody>(null!);

    const [state, setState] = useState<ContestZone>(new ContestZone());

    useEffect(() => {
        const interval = setInterval(() => { // апдейт очков должен происходить раз в секунду, кроме тех случаев, когда игрок выходит из зоны
            const time = Date.now();
            state.updateScore(time);
            // console.log(state.score, state.players);
        }, 1000);

        return () => {
            clearInterval(interval);
        }

    }, [state]);

    return (
        <RigidBody
            ref={ref}
            userData={{
                type: "zone"
            }}
        >

            <group position={position}>
                <CuboidCollider
                    args={[1, 1, 0.5]}
                    sensor
                    onIntersectionEnter={(e) => {
                        const data: any = e.other.rigidBody?.userData;
                        if (data.type === "player" && data.hp) {
                            state.addPlayer(data.team);
                        }
                    }}
                    onIntersectionExit={(e) => {
                        const data: any = e.other.rigidBody?.userData;
                        if (data.type === "player" || data.hp === 0) {
                            state.removePlayer(data.team);
                        }
                    }} />
            </group>
        </RigidBody>
    )
}

export default Zone;