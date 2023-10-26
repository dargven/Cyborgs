import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { IPlayerProps } from "./Player";
import { Suspense, useMemo } from "react";
import { KeyboardControlsEntry, KeyboardControls, OrthographicCamera } from "@react-three/drei";

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

    const vSize = 20;
    const aspect = window.innerWidth / window.innerHeight;

    return (
        <KeyboardControls map={inputMap}>
            <Canvas>
                <OrthographicCamera makeDefault position={[0, 0, 0]} near={-100} far={10} left={-vSize * aspect / 2} right={vSize * aspect / 2} top={vSize / 2} bottom={-vSize / 2}>
                    <Scene playerProps={playerProps} cameraProps={{ vSize, aspect }} />
                </OrthographicCamera>
            </Canvas>
        </KeyboardControls>
    );
}

export default Game;
