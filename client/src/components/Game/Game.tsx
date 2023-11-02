import { KeyboardControls, KeyboardControlsEntry, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { IPlayerProps } from "./Player";
import Scene from "./Scene";

export enum EControls {
    up = 'up',
    down = 'down',
    left = 'left',
    right = 'right',
    shoot = 'shoot',
    hitscan = 'hitscan'
}

const playerProps: IPlayerProps = {
    id: 1337,
}

const Game = () => {
    const inputMap = useMemo<KeyboardControlsEntry[]>(() => [
        { name: EControls.up, keys: ['KeyW'] },
        { name: EControls.down, keys: ['KeyS'] },
        { name: EControls.left, keys: ['KeyA'] },
        { name: EControls.right, keys: ['KeyD'] },
        { name: EControls.shoot, keys: ['Space'] },
        { name: EControls.hitscan, keys: ['KeyH'] },
    ], []);

    const vSize = 20;
    const aspect = window.innerWidth / window.innerHeight;

    return (
        <KeyboardControls map={inputMap}>
            <Canvas style={{ background: 'black' }}>
                <PerspectiveCamera position={[0, 0, 0]}>
                    <Scene playerProps={playerProps} cameraProps={{ vSize, aspect }} />
                    <axesHelper />
                </PerspectiveCamera>
            </Canvas>
        </KeyboardControls>
    );
}

export default Game;
