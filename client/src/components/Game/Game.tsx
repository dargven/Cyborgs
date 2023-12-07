import { KeyboardControls, KeyboardControlsEntry, PerspectiveCamera, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import Scene from "./Scene";
import NewScene from "./NewScene";

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

const Game = () => {
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


    return (
        <KeyboardControls map={inputMap}>
            <Canvas style={{ background: 'black' }} frameloop="demand">
                <Suspense>

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

export default Game;
