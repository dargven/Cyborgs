import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

const Game: React.FC = () => {
    return (
        <Canvas camera={{ position: [0, 10, 0]}} >

            <ambientLight />
            <pointLight position={[0, 2, 0]} intensity={200} />
            <axesHelper />
            <Scene />
        </Canvas>
    );
}



export default Game;