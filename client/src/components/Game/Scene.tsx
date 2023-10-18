import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group, Mesh} from "three";
import Map from "./Map";
import Player, { IPlayerProps } from "./Player";
import { EControls } from "./Game";
import { useKeyboardControls } from "@react-three/drei";
import Projectile from "./Projectile"
import Robot from "./Robot";


interface ISceneProps {
    playerProps: IPlayerProps;
}

const Scene = (props: ISceneProps) => {
    const scale = 1;

    const sceneRef = useRef<Mesh>(null!);
    const playerRef = useRef<Group>(null!);

    const [bullets, setBullets] = useState<JSX.Element[]>([]);

    const leftPressed = useKeyboardControls((state) => state[EControls.left]);
    const rightPressed = useKeyboardControls((state) => state[EControls.right]);
    const upPressed = useKeyboardControls((state) => state[EControls.up]);
    const downPressed = useKeyboardControls((state) => state[EControls.down]);
    const shootPressed = useKeyboardControls((state) => state[EControls.shoot]);

    const handleMovement = () => {
        if (props.playerProps.isAlive) {
            const position = playerRef.current.position;
            if (leftPressed) {
                position.set(position.x - 0.025, position.y, position.z);
            }
            if (rightPressed) {
                position.set(position.x + 0.025, position.y, position.z);
            }
            if (upPressed) {
                position.set(position.x, position.y, position.z - 0.025);
            }
            if (downPressed) {
                position.set(position.x, position.y, position.z + 0.025);
            }
            if (shootPressed) {
                const arr = [<Projectile key={`${props.playerProps.id}-${bullets.length}`} initialPosition={position} />];
                setBullets(arr.concat(bullets));
            }
        }
    }

    useFrame(() => {
        handleMovement();
    })

    return (
        <group>
            <group ref={playerRef}>
                <Player isAlive={props.playerProps.isAlive} id={props.playerProps.id} />
            </group>

            <group>
            {bullets}
            </group>

            <Robot/>

            <mesh ref={sceneRef} position={[-5, 0, -2.5]} rotation={[Math.PI / 2, 0, 0]}>
                <Map scale={scale} />
            </mesh>
        </group>
    );
}

export default Scene;