import { useFrame, useThree } from "@react-three/fiber";
import { createRef, useEffect, useState } from "react";
import { Fog, Texture, TextureLoader, Vector3 } from "three";
import Player, { IPlayerProps } from "./Player";
import { Sky, SpotLight, Stars, useKeyboardControls } from "@react-three/drei";
import Projectile from "./Projectile"
import Hitscan from "./Hitscan";
import { PROJECTILE } from "../../assets/images";
import { Physics, RapierRigidBody, vec3 } from "@react-three/rapier";
import Bullet from "../../modules/Game/Bullet";
import Laser from "../../modules/Game/Laser";
import Map from "./Map";
import Zone from "./Zone";
import TestRoom from "./TestRoom";
import tspawn from './assets/rooms/tspawn.png';

interface ISceneProps {
    playerProps: IPlayerProps;
    cameraProps: {
        vSize: number;
        aspect: number;
    }
}

interface ITextureObject {
    [key: string]: Texture
}

const playerRef = createRef<RapierRigidBody>(); // вынес из зависимостей useEffect

const Scene = (props: ISceneProps) => {
    const textureLoader = new TextureLoader();
    const TPROJECTILE = textureLoader.load(PROJECTILE);
    const room = textureLoader.load('./assets/rooms/map-office-plain.png');

    const scale = 1;

    const [controlKeys, getKeys] = useKeyboardControls();

    const [textures, setTextures] = useState<ITextureObject>({
        'room': room,
        'bullet': TPROJECTILE
    });
    const [isMoving, setMoving] = useState<boolean>(false);
    const [bullets, setBullets] = useState<Bullet[]>([]);
    const [lasers, setLasers] = useState<Laser[]>([]);

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

        const velocity = vec3(playerRef.current?.linvel())
        if (velocity.length() === 0) {
            setMoving(false)
        } else {
            setMoving(true)
        }

        const { shoot, hitscan } = getKeys();

        const playerPosition = vec3(playerRef.current?.translation());
        camera.position.set(playerPosition.x, playerPosition.y, 7);
        camera.updateProjectionMatrix();

        if (shoot) {
            const direction = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);
            const position = vec3(playerRef.current?.translation());
            direction.setLength(0.6);
            position.x += direction.x;
            position.y += direction.y;
            position.z = 0;
            direction.setLength(1);
            const bullet = new Bullet(
                30,
                position,
                direction,
                `${props.playerProps.id}-${Date.now()}`
            );
            setBullets((bullets) => [...bullets, bullet]);
        }
        if (hitscan) {
            const position = vec3(playerRef.current?.translation());
            const aimingPoint = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);
            aimingPoint.setLength(5);
            aimingPoint.x += position.x;
            aimingPoint.y += position.y;
            const laser = new Laser(
                position,
                aimingPoint,
                `${props.playerProps.id}-${Date.now()}`
            )
            setLasers((lasers) => [...lasers, laser])
        }

        // camera.setViewOffset(vSize, vSize, position.x / viewport.aspect, position.y, vSize * viewport.aspect / 2, vSize * viewport.aspect / 2)
        // camera.updateProjectionMatrix();
    });

    return (
        <group>
            <Physics gravity={[0, 0, 0]} colliders="hull" debug>
                <group>
                    <ambientLight intensity={5} />
                    {/* SIDE HALL LIGHT */}
                    <pointLight position={[9, 8, 3]} intensity={0.5} />
                    <pointLight position={[-11, 8, 3]} intensity={0.5} />
                    <pointLight position={[0, 9, 3]} intensity={10} />
                    <spotLight position={[5, 5, 1]} intensity={10} />
                    {/*  */}

                    {/* LONG HALL LIGHT */}
                    <pointLight position={[-10, 3, 3]} intensity={0.5} />
                    <pointLight position={[-11, -5, 3]} intensity={0.5} />
                    {/*  */}

                    {/* T SPAWN LIGHT */}
                    <pointLight position={[10, 0, 3]} intensity={0.5} />
                    <pointLight position={[0, -5, 3]} intensity={0.5} />
                    <pointLight position={[8, -10, 3]} intensity={0.5} />
                    {/*  */}
                </group>

                <fog />

                <group position={[10, 0, 0]}>
                    <Player ref={playerRef} id={1338} isMoving={isMoving} />
                    <Player />
                    {/* <Robot /> */}
                </group>

                {bullets.map(bullet =>
                    <Projectile
                        key={bullet.key}
                        initialSpeed={bullet.speed}
                        initialPosition={bullet.position}
                        direction={bullet.direction}
                        texture={textures['bullet']}
                    />
                )}

                {lasers.map(laser =>
                    <Hitscan
                        key={laser.key}
                        initialPosition={[laser.position.x, laser.position.y]}
                        aimingPoint={[laser.aimingPoint.x, laser.aimingPoint.y]}
                    />
                )}

                <group scale={[81, 61, 1]} position={[0, 0, 0]}>
                    <TestRoom texture={textures['room']} position={new Vector3(0, 0, 0)} />
                </group>

                {/* <group position={[0, 0, -0.1]}>
                    <Map scale={scale} />
                </group> */}
                <Zone />
            </Physics>
            <Stars />
        </group>
    );
}

export default Scene;