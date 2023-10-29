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
import { Physics, RapierRigidBody, vec3 } from "@react-three/rapier";
import Bullet from "../../modules/Game/Bullet";

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

    const { viewport, camera, pointer } = useThree();

    const vSize = props.cameraProps.vSize;
    const aspect = props.cameraProps.aspect;

    useEffect(() => {
        const interval = setInterval(() => {
            playerRef.current?.resetForces(true);
            // console.log(position);
            const { up, down, left, right, shoot } = getKeys();
            // if (hp > 0) {
            const direction = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);
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
            if (shoot) {
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
                    `${props.playerProps.id}-${bullets.length}`
                );
                setBullets((bullets) => [bullet, ...bullets]);
            }

            playerRef.current?.addForce(force, true);

        }, 50);

        return () => {
            clearInterval(interval);
        }

    }, [bullets, getKeys, pointer, viewport.aspect]);

    useFrame((delta) => {
        // camera.setViewOffset(-vSize, vSize, -position.x / viewport.aspect, -position.y, -vSize * viewport.aspect / 2, vSize * viewport.aspect / 2)
        // camera.updateProjectionMatrix();
    });

    return (
        <group>
            <Physics gravity={[0, 0, 0]} colliders="hull">

                <ambientLight intensity={0.5} />

                <group position={[10, 0, 0]}>
                    <Player ref={playerRef} id={1338} />
                    <Robot />
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

                <group position={[0, 0, -0.1]}>
                    <Map scale={scale} />
                </group>

            </Physics>
        </group>
    );
}

export default Scene;