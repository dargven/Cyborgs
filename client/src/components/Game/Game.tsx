import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import Player from "./Player";
import { KeyboardEvent } from "react";

const Game: React.FC = () => {

    const inputHandler = (event: KeyboardEvent<HTMLDivElement>) => {
        console.log(event.key);
    }

    return (
        <Canvas camera={{ position: [0, 10, 0] }} onKeyDownCapture={inputHandler}>
            <Player />
            <ambientLight intensity={0.1} />
            <pointLight position={[10, 10, 10]} intensity={200} />
            <axesHelper />
            <Scene />
        </Canvas>
    );
}



export default Game;