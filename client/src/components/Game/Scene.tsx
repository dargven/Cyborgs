import { useFrame, useThree } from "@react-three/fiber";
import { createRef, useEffect, useRef, useState } from "react";
import { Group, Mesh, TextureLoader, Vector3 } from "three";
import Map from "./Map";
import Player, { IPlayerProps } from "./Player";
import { EControls } from "./Game";
import { useKeyboardControls } from "@react-three/drei";
import Projectile from "./Projectile"
import Robot from "./Robot";
import { PROJECTILE } from "../../assets/images";
import { Physics, RapierRigidBody } from "@react-three/rapier";

interface ISceneProps {
    playerProps: IPlayerProps;
    cameraProps: {
        vSize: number;
        aspect: number;
    }
}

const Scene = (props: ISceneProps) => {
    const textureLoader = new TextureLoader();
    const TPROJECTILE = textureLoader.load(PROJECTILE);

    const scale = 1;

    const [controlKeys, getKeys] = useKeyboardControls();
    // const sceneRef = useRef<Mesh>(null!);
    const playerRef = createRef<RapierRigidBody>();
    // const [position, setPostition] = useState<Vector3>(new Vector3());

    const [bullets, setBullets] = useState<JSX.Element[]>([]);

    const { viewport, camera, pointer } = useThree();

    const vSize = props.cameraProps.vSize;
    const aspect = props.cameraProps.aspect;

    useEffect(() => {
        const interval = setInterval(() => {
            playerRef.current?.resetForces(true);
            const position = playerRef.current?.translation() as Vector3;
            // console.log(position);
            const { up, down, left, right, shoot } = getKeys();
            // if (hp > 0) {
            const direction = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);
            direction.normalize();
            const force = new Vector3();

            if (left) {
                force.x -= 1;
            }
            if (right) {
                force.x += 1;
            }
            if (up) {
                force.y += 1;
            }
            if (down) {
                force.y -= 1;
            }
            const _velocity = playerRef.current?.linvel();
            const vel = new Vector3(_velocity?.x, _velocity?.y, 0);
            const len = vel.length();
            if (len < 1) {
                force.setLength(1);
            } else {
                force.setLength(1 / len);
            }
            if (shoot) {
                force.setLength(0.4);
                const arr = [
                    <Projectile
                        key={`${props.playerProps.id}-${bullets.length}`}
                        initialPosition={position}
                        texture={TPROJECTILE}
                        direction={direction} />
                ];

                setBullets(bullets => arr.concat(bullets));
            }
            if (playerRef.current) {
                playerRef.current.addForce(force, true);
            }
        }, 50);

        return () => {
            clearInterval(interval);
        }
    }, []);

    useFrame(() => {
        // camera.setViewOffset(-vSize, vSize, -position.x / viewport.aspect, -position.y, -vSize * viewport.aspect / 2, vSize * viewport.aspect / 2)
        // camera.updateProjectionMatrix();
    });

    return (
        <group position={[0, 0, -1]}>
            <Physics gravity={[0, 0, 0]} colliders="hull" debug>

                <ambientLight intensity={0.5} />

                <Player ref={playerRef} id={1338} />

                {bullets}

                <Robot />
                <group position={[0, 0, -0.1]}>
                    <Map scale={scale} />
                </group>

            </Physics>
        </group>
    );
}

export default Scene;