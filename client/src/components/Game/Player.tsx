import { SADTROLLFACE, TROLLFACE } from "../../assets/images";
import { Texture, TextureLoader, Vector, Vector3 } from "three";
import { useEffect, useRef, useState } from "react";
import HealthBar from "./HealthBar";
import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";

export interface ICallBack {
    (...args: any): void;
}

export interface IPlayerProps {
    callbacks2?: (() => {})[];
    callbacks: ICallBack[];
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

    const { viewport, camera, pointer } = useThree();

    useEffect(() => {
        // console.log(up, down, left, right)

        const interval = setInterval(() => {
            const { up, down, left, right, shoot } = getKeys();
            if (hp > 0) {
                const direction = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);
                direction.normalize();
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
                if (shoot) {
                    props.callbacks[0](props.id, playerRef.current.translation(), direction);
                    impulse.setLength(0.01);
                }

                // убрал стрельбу и движение камеры

                playerRef.current.applyImpulse(impulse, true);

                const _velocity = playerRef.current.linvel();
                // const velocity = new Vector3(_velocity.x, _velocity.y, 0);
                // velocity.lerp()
                // velocity.setLength();
                // playerRef.current.setLinvel({ x: velocity.x, y: velocity.y, z: velocity.z }, true);

                // console.log(velocity.length())
                // console.log();
                // console.log(playerRef.current.translation(), impulse);
            }
        }, 50);

        return () => {
            clearInterval(interval);
        }
    });



    useFrame(() => {
        if (hp > 0) {
            const playerPosition = playerRef.current.translation() as Vector3;
            const vSize = 20;
            camera.setViewOffset(-vSize, vSize, -playerPosition.x / viewport.aspect, -playerPosition.y, -vSize * viewport.aspect / 2, vSize * viewport.aspect / 2)
            camera.updateProjectionMatrix();
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