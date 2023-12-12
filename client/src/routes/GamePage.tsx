import { Html, KeyboardControls, KeyboardControlsEntry, PerspectiveCamera, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useContext, useEffect, useMemo, useRef, useState } from "react";
import NewScene from "../components/Game/NewScene";
import { ServerContext, StoreContext } from "../App";
import Game from "../modules/Game/Game";
import Chat from "../components/Chat/Chat";
import "../TeamSelect.css";

export enum EControls {
    up = 'up',
    down = 'down',
    left = 'left',
    right = 'right',
    shoot = 'shoot',
    hitscan = 'hitscan',
    select1 = 'select1',
    select2 = 'select2',
    select3 = 'select3',
}

const GamePage = () => {
    const inputMap = useMemo<KeyboardControlsEntry[]>(() => [
        { name: EControls.up, keys: ['KeyW'] },
        { name: EControls.down, keys: ['KeyS'] },
        { name: EControls.left, keys: ['KeyA'] },
        { name: EControls.right, keys: ['KeyD'] },
        { name: EControls.shoot, keys: ['Space'] },
        { name: EControls.hitscan, keys: ['KeyH'] },
        { name: EControls.select1, keys: ['1'] },
        { name: EControls.select2, keys: ['2'] },
        { name: EControls.select3, keys: ['3'] },
    ], []);

    const server = useContext(ServerContext);
    const store = useContext(StoreContext);

    const game = useRef<Game>(new Game(server, store));

    const [team, setTeam] = useState<0 | 1 | null>(null);

    useEffect(() => {
        console.log(team);

        return () => {
            clearInterval(game.current.intervalID)
        }
    }, []);

    return (
        <div>
            <KeyboardControls map={inputMap}>
                <Chat />
                {team === null ? (
                    <div>
                        <button onClick={() => setTeam(0)} className="Team1">
                            команда 1
                        </button>
                        <button onClick={() => setTeam(1)} className="Team2">
                            команда 2
                        </button>
                    </div>
                ) : (
                    <div>
                        <Canvas style={{ background: 'black' }} frameloop="demand">
                            <Suspense>
                                <PerspectiveCamera position={[0, 0, 0]}>
                                    <NewScene />
                                    <axesHelper />
                                </PerspectiveCamera>
                            </Suspense>
                            <Preload all />
                        </Canvas>
                    </div >
                )}
            </KeyboardControls >
        </div >
    );
}

export default GamePage;
