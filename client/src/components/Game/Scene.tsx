import { useFrame, useThree } from "@react-three/fiber";
import { createRef, useEffect, useState } from "react";
import { TextureLoader, Vector3 } from "three";
import Player, { IPlayerProps } from "./Player";
import { useKeyboardControls } from "@react-three/drei";
import Projectile from "./Projectile"
import { PROJECTILE } from "../../assets/images";
import { Physics, RapierRigidBody, vec3 } from "@react-three/rapier";
import Bullet from "../../modules/Game/Bullet";
import Map from "./Map";
import Zone from "./Zone";
import Hitscan from "./Hitscan";

interface ISceneProps {
    playerProps: IPlayerProps;
    cameraProps: {
        vSize: number;
        aspect: number;
    }
}

const playerRef = createRef<RapierRigidBody>(); // вынес из зависимостей useEffect

const Scene = (props: ISceneProps) => {
    const textureLoader = new TextureLoader();
    const TPROJECTILE = textureLoader.load(PROJECTILE);

    const scale = 1;

    const [controlKeys, getKeys] = useKeyboardControls();

    const [bullets, setBullets] = useState<Bullet[]>([]);
    const [lasers, setLasers] = useState<Bullet[]>([]);

    const { viewport, camera, pointer } = useThree();

    const vSize = props.cameraProps.vSize;
    const aspect = props.cameraProps.aspect;

    useEffect(() => {
        const interval = setInterval(() => {
            playerRef.current?.resetForces(true);
            // console.log(position);
            const { up, down, left, right } = getKeys();
            // if (hp > 0) {
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
            const velocity = vec3(playerRef.current?.linvel());
            const len = velocity.length();
            if (len < 1) {
                force.setLength(1);
            } else {
                force.setLength(1 / len);
            }


            playerRef.current?.addForce(force, true);

        }, 50);

        return () => {
            clearInterval(interval);
        }

    }, [getKeys, pointer, viewport.aspect]);

    useFrame((delta) => {
        const { shoot, hitscan } = getKeys();

        if (shoot) {
            const direction = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);
            const position = vec3(playerRef.current?.translation());
            direction.setLength(0.6);
            position.x += direction.x;
            position.y += direction.y;
            position.z = 0;
            direction.setLength(0.01);
            const bullet = new Bullet(
                10,
                position,
                direction,
                `${props.playerProps.id}-${Date.now()}`
            );
            setBullets((bullets) => [...bullets, bullet]);
        }
        if (hitscan) {
            const direction = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);
            const position = vec3(playerRef.current?.translation());
            direction.setLength(0.6);
            position.x = direction.x * 40;
            position.y = direction.y * 40;
            position.z = 0;
            direction.setLength(0.01);
            const laser = new Bullet(
                0,
                position,
                direction,
                `${props.playerProps.id}-${Date.now()}`
            );
            setLasers((lasers) => [...lasers, laser]);
        }

        // camera.setViewOffset(-vSize, vSize, -position.x / viewport.aspect, -position.y, -vSize * viewport.aspect / 2, vSize * viewport.aspect / 2)
        // camera.updateProjectionMatrix();
    });

    return (
        <group>
            <Physics gravity={[0, 0, 0]} colliders="hull" debug>

                <group>
                    <ambientLight intensity={1} color={'rgb(25, 24, 104)'} />
                    {/* SIDE HALL LIGHT */}
                    <pointLight position={[9, 8, 3]} intensity={50} />
                    <pointLight position={[-11, 8, 3]} intensity={30} />
                    <pointLight position={[0, 9, 3]} intensity={50} />
                    {/*  */}

                    {/* LONG HALL LIGHT */}
                    <pointLight position={[-10, 3, 3]} intensity={80} />
                    <pointLight position={[-11, -5, 3]} intensity={80} />
                    {/*  */}

                    {/* T SPAWN LIGHT */}
                    <pointLight position={[10, 0, 3]} intensity={100} />
                    <pointLight position={[0, -5, 3]} intensity={100} />
                    <pointLight position={[8, -10, 3]} intensity={100} />
                    {/*  */}
                </group>

                <group position={[10, 0, 0]}>
                    <Player ref={playerRef} id={1338} />
                    <Player />
                    {/* <Robot /> */}
                </group>


                {bullets.map(bullet =>
                    <Projectile
                        key={bullet.key}
                        initialSpeed={bullet.speed}
                        initialPosition={bullet.position}
                        direction={bullet.direction}
                        texture={TPROJECTILE}
                    />
                )}
                {/* {lasers.map(laser =>
                    <Hitscan
                        key={laser.key}
                        initialPosition={laser.position}
                        direction={laser.direction}
                    />
                )} */}

                <group position={[0, 0, -0.1]}>
                    <Map scale={scale} />
                </group>
                <Zone/>
            </Physics>
        </group>
    );
}

export default Scene;