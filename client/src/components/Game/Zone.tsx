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
    const [players, setPlayers] = useState<IZonePlayer[]>([]);
    const [data, setData] = useState<any>({
        type: "zone",
        players: [] as IZonePlayer[]
    });

    useEffect(() => {
        const interval = setInterval(() => { // апдейт очков должен происходить раз в секунду, кроме тех случаев, когда игрок выходит из зоны

            if (ref.current.userData) {
                const _data: any = ref.current.userData;
                // console.log(data.type);
                const dataPlayers: IZonePlayer[] = _data.players;
            }

                ref.current.userData = data;

                const time = Date.now();
                state.updateScore(time);

                const filtered = players.filter(player => player.hp !== 0);
                setPlayers(filtered);

                console.log(state.score, state.players, players, data)
        }, 1000);

        return () => {
            clearInterval(interval);
        }

    }, [players, state, ref.current]);

    return (
        <RigidBody
            ref={ref}
        >

            <group position={position}>
                <CuboidCollider
                    args={[1, 1, 0.5]}
                    sensor
                    onIntersectionEnter={(e) => {
                        const data: any = e.other.rigidBody?.userData;
                        if (data.type === "player") {
                            state.addPlayer(data.team);
                            setPlayers([...players, { team: data.team, hp: data.hp, id: data.id }])
                        }
                    }}
                    onIntersectionExit={(e) => {
                        const data: any = e.other.rigidBody?.userData;
                        if (data.type === "player") {
                            state.removePlayer(data.team);
                            const filtered = players.filter(player => player.id !== data.id);
                            setPlayers(filtered);
                        }
                    }} />
            </group>
        </RigidBody>
    )
}

export default Zone;