import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh} from "three";
import Map from "./Map";

const Scene = () => {
    const sceneRef = useRef<Mesh>(null!);
    const scale = 1;

    const { viewport } = useThree();
    console.log(viewport)

    return (
        <group>
            <gridHelper args={[20, 20, 0x222222, 0xdddddd]} />
            <mesh ref={sceneRef} rotation={[Math.PI / 2, 0, 0]}>
                <Map scale={scale}/>
            </mesh>
        </group>
    );
}

export default Scene;