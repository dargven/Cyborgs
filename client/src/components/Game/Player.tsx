import { SADTROLLFACE, TROLLFACE } from "../../assets/images";
import { Texture, TextureLoader, Vector3 } from "three";
import { useEffect, useRef, useState } from "react";
import HealthBar from "./HealthBar";
import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";

export interface IPlayerProps {
    id?: number;
    username?: string;
    hp?: number;
    position?: Vector3;
}

const Player = (props: IPlayerProps) => {
    const playerRef = useRef<RapierRigidBody>(null!);

    const [hp, setHp] = useState<number>(100);

    const [controlKeys, getKeys] = useKeyboardControls();

    const textureLoader = new TextureLoader();
    const TTROLLFACE = textureLoader.load(TROLLFACE);
    const TSADTROLLFACE = textureLoader.load(SADTROLLFACE);

    const [textures, setTextures] = useState<Texture[]>([TTROLLFACE, TSADTROLLFACE,]);

    useEffect(() => {
        // console.log(up, down, left, right)

        const interval = setInterval(() => {
            const { up, down, left, right, shoot } = getKeys();
            if (hp > 0) {
                // const direction = new Vector3(pointer.x, pointer.y / aspect, 0);
                // direction.normalize();
                const impulse = new Vector3();

                if (left) {
                    impulse.x -= 1;
                }
                if (right) {
                    impulse.x += 1;
                }
                if (up) {
                    impulse.y += 1;
                }
                if (down) {
                    impulse.y -= 1;
                }
                impulse.setLength(0.1);
                // if (shoot) {
                //     //     const arr = [<Projectile key={`${props.playerProps.id}-${bullets.length}`} initialPosition={position} texture={TPROJECTILE} direction={direction} />];
                //     //     setBullets(arr.concat(bullets));
                // }

                // убрал стрельбу и движение камеры

                const velocity = playerRef.current.linvel();

                // velocity.setLength(velocity.length() > 10 ? 10 : velocity.length());
                // console.log(velocity.length())
                // console.log();
                playerRef.current.applyImpulse(impulse, true);
                // console.log(playerRef.current.translation(), impulse);
            }
        }, 50);

        return () => {
            clearInterval(interval);
        }
    });

    const { viewport, camera, pointer } = useThree();

    useFrame(() => {
        if (hp > 0) {
            const playerPosition = playerRef.current.translation() as Vector3;
            // camera.lookAt(playerPosition);

            // camera.setViewOffset(-vSize, vSize, -playerPosition.x / aspect, -playerPosition.y, -vSize * aspect / 2, vSize * aspect / 2)
            // camera.updateProjectionMatrix();
            // camera.clearViewOffset для удаления смещения
        }
    });

    return (
        <RigidBody
            ref={playerRef}
            scale={0.5}
            position={[-2, 0, 0]}
            colliders="hull"
            friction={0.5}
            linearDamping={0.9}
            angularDamping={1}
        >
            <BallCollider args={[0.5]} />
            <HealthBar />
            {/* <MakeSprite texture={true ? TTROLLFACE : TSADTROLLFACE} position={new Vector3(0, 0, 0)} isCollider={true} isSphere={true} /> */}

            {/* <FlipSprites spriteTexture={Cyborg_sSheet} tilesHoriz={2} tilesVert={4}></FlipSprites> */}

        </RigidBody>
    );
}

export default Player;