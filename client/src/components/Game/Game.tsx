import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

const Game: React.FC = () => {
    return (
        <Canvas camera={{ position: [0, 10, 0]} } >
            <ambientLight intensity={0.1}/>
            <pointLight position={[10, 10, 10]} intensity={200} />
            <axesHelper />
            <Scene />
        </Canvas>
    );
}



export default Game;