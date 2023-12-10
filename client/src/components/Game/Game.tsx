import { KeyboardControls, KeyboardControlsEntry, PerspectiveCamera, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useContext, useEffect, useMemo, useRef } from "react";
import Scene from "./Scene";
import NewScene from "./NewScene";
import { ServerContext, StoreContext } from "../../App";
import Game from "../../modules/Game/Game";
import Chat from "../Chat/Chat";

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

const Game_0 = () => {
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

    useEffect(()=>{
        return() => {
            clearInterval(game.current.intervalID)
        }
    },[]);


    return (
        <KeyboardControls map={inputMap}>
            <Canvas style={{ background: 'black' }} frameloop="demand">
                <Suspense>
                    <Chat/>

                    <PerspectiveCamera position={[0, 0, 0]}>
                        <NewScene />
                        {/* <Scene /> */}
                        {/* <axesHelper /> */}
                    </PerspectiveCamera>
                </Suspense>
                <Preload all />
            </Canvas>
        </KeyboardControls>
    );
}

export default Game_0;
