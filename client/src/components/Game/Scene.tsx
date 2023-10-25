import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group, Mesh, TextureLoader, Vector3 } from "three";
import Map from "./Map";
import Player, { IPlayerProps } from "./Player";
import { EControls } from "./Game";
import { useKeyboardControls } from "@react-three/drei";
import Projectile from "./Projectile"
import Robot from "./Robot";
import { Box,Sphere } from "@react-three/drei";
import { RigidBody, CuboidCollider,Physics, BallCollider} from "@react-three/rapier";

import { PROJECTILE } from "../../assets/images";
import MakeCollider from "./MakeCollider";


interface ISceneProps {
    playerProps: IPlayerProps;
}

const Scene = (props: ISceneProps) => {

    const textureLoader = new TextureLoader();
    const TPROJECTILE = textureLoader.load(PROJECTILE);

    const scale = 1;

    const sceneRef = useRef<Mesh>(null!);
    const playerRef = useRef<Group>(null!);

    const [bullets, setBullets] = useState<JSX.Element[]>([]);

    const leftPressed = useKeyboardControls((state) => state[EControls.left]);
    const rightPressed = useKeyboardControls((state) => state[EControls.right]);
    const upPressed = useKeyboardControls((state) => state[EControls.up]);
    const downPressed = useKeyboardControls((state) => state[EControls.down]);
    const shootPressed = useKeyboardControls((state) => state[EControls.shoot]);
    const { viewport, camera, pointer } = useThree();

    useEffect(() => {
        const interval = setInterval(() => {

            if (props.playerProps.isAlive) {
                const position = playerRef.current.position;
    
                if (leftPressed) {
                    position.set(position.x - 0.025, position.y, position.z);
                }
                if (rightPressed) {
                    position.set(position.x + 0.025, position.y, position.z);
                }
                if (upPressed) {
                    position.set(position.x, position.y + 0.025, position.z);
                }
                if (downPressed) {
                    position.set(position.x, position.y - 0.025, position.z);
                }
                if (shootPressed) {
                    const direction = new Vector3(); 
                    // в direction должен попадать вектор от игрока к курсору (во внутриигровых координатах)
                    // вектор должен быть нормализован
                    camera.position.lerp(direction.set(pointer.x, pointer.y, 0), 0);
                    const arr = [<Projectile key={`${props.playerProps.id}-${bullets.length}`} initialPosition={position} texture={TPROJECTILE} direction={direction} />];

                    //потом придумаю как дергать пули и выкидывать их из массива
                    setBullets(arr.concat(bullets));

                    console.log(bullets.length);
                }
            }
        }, 50);

        return () => {
            clearInterval(interval);
        }
    });

    return (
        <group>
            <ambientLight intensity={1} />

            <group ref={playerRef}>
                <Player isAlive={props.playerProps.isAlive} id={props.playerProps.id} />
            </group>

            <group>
                {bullets}
            </group>
      

            <MakeCollider/>

            <Robot />

            <mesh ref={sceneRef}>
                <Map scale={scale} />
            </mesh>
        </group>
    );
}

export default Scene;