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
    // const [players, setPlayers] = useState<IZonePlayer[]>([]);
    // const [data, setData] = useState<any>({
    //     type: "zone",
    //     players: [] as IZonePlayer[],
    //     bodies: [] as RapierRigidBody[]
    // });

    useEffect(() => {
        const interval = setInterval(() => { // апдейт очков должен происходить раз в секунду, кроме тех случаев, когда игрок выходит из зоны

            // if (ref.current.userData) {
            // const userData: any = ref.current.userData ? ref.current.userData : { players: [] };
            // // console.log(_data)
            // // console.log(data.type);
            // const dataPlayers: IZonePlayer[] = userData.players;
            // const bodies: RapierRigidBody[] = userData.bodies;

            // ref.current.userData = data;

            const time = Date.now();
            state.updateScore(time);

            // const filtered = players.filter(player => player.hp !== 0);
            // setPlayers(filtered);
            // console.log(bodies)
            // }

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
                        const target = e.target.collider;
                        // console.log(data, target.handle);
                        if (data.type === "player" && data.hp) {
                            state.addPlayer(data.team);
                            // setPlayers([...players, { team: data.team, hp: data.hp, id: data.id }]);
                        }
                    }}
                    onIntersectionExit={(e) => {
                        const data: any = e.other.rigidBody?.userData;
                        if (data.type === "player" || data.hp === 0) {
                            state.removePlayer(data.team);
                            // const filtered = players.filter(player => player.id !== data.id);
                            // setPlayers(filtered);
                        }
                    }} />
            </group>
        </RigidBody>
    )
}

export default Zone;