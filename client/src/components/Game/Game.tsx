import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import Player from "./Player";
import { useMemo } from "react";
import { KeyboardControlsEntry, KeyboardControls } from "@react-three/drei";

export enum EControls {
    up = 'up',
    down = 'down',
    left = 'left',
    right = 'right',
    shoot = 'shoot'
}

const Game: React.FC = () => {

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
                <Player />
                <ambientLight intensity={0.1} />
                <pointLight position={[10, 10, 10]} intensity={200} />
                <axesHelper />
                <Scene />
            </Canvas>
        </KeyboardControls>
    );
}



export default Game;