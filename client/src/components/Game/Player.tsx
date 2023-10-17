import MakeSprite from "./MakeSprite";
import { TROLLFACE } from "../../assets/images";
import { BufferGeometry, Mesh, Vector3 } from "three";
import { EControls } from "./Game";
import { useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Player = () => {

    const playerRef = useRef<Mesh>(null!);

    const leftPressed = useKeyboardControls((state) => state[EControls.left]);
    const rightPressed = useKeyboardControls((state) => state[EControls.right]);
    const upPressed = useKeyboardControls((state) => state[EControls.up]);
    const downPressed = useKeyboardControls((state) => state[EControls.down]);


    const handleMovement = () => {
        const postion = playerRef.current.position;
        if (leftPressed) {
            playerRef.current.position.set(postion.x - 0.025, postion.y, postion.z);
        }
        if (rightPressed) {
            playerRef.current.position.set(postion.x + 0.025, postion.y, postion.z);
        }
        if (upPressed) {
            playerRef.current.position.set(postion.x, postion.y, postion.z - 0.025);
        }
        if (downPressed) {
            playerRef.current.position.set(postion.x, postion.y, postion.z + 0.025);
        }
    }

    useFrame(() => {
        handleMovement();
    });

    return (
        <mesh ref={playerRef} scale={0.5}>
            <MakeSprite texture={TROLLFACE} position={new Vector3(0, 0.1, 0)} rotation={[Math.PI / 2, -Math.PI, Math.PI]} />
        </mesh>
    );
}

export default Player;