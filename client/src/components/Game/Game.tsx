import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { IPlayerProps } from "./Player";
import { useMemo } from "react";
import { KeyboardControlsEntry, KeyboardControls } from "@react-three/drei";

export enum EControls {
    up = 'up',
    down = 'down',
    left = 'left',
    right = 'right',
    shoot = 'shoot'
}

const playerProps: IPlayerProps = {
    id: 1337,
    isAlive: true
}

const Game = () => {

    const inputMap = useMemo<KeyboardControlsEntry[]>(() => [
        { name: EControls.up, keys: ['KeyW'] },
        { name: EControls.down, keys: ['KeyS'] },
        { name: EControls.left, keys: ['KeyA'] },
        { name: EControls.right, keys: ['KeyD'] },
        { name: EControls.shoot, keys: ['Space'] },
    ], []);

    return (
        <KeyboardControls map={inputMap}>
            <Canvas camera={{ position: [0, 10, 0] }} >
                <Scene playerProps={playerProps} />
            </Canvas>
        </KeyboardControls>
    );
}



export default Game;