import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, Mesh, PlaneGeometry } from "three";

const Scene = () => {
    const sceneRef = useRef<Mesh>(null!);

    const { viewport } = useThree();
    console.log(viewport)

    return (
        <group>
            {/* <gridHelper args={[20, 20, 0x222222, 0xdddddd]} /> */}
            <mesh ref={sceneRef} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[viewport.height, viewport.width]} />
                <meshBasicMaterial side={DoubleSide} />
            </mesh>
        </group>
    );
}

export default Scene;