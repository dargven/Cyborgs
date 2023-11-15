import { SpriteAnimator, useKeyboardControls } from "@react-three/drei";
import { BallCollider, RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import HealthBar from "./HealthBar";
import { useFrame } from "@react-three/fiber";
import { Laser } from "../../modules/Game/entities";
import { IZonePlayer } from "./Zone";

interface IPlayerProps {
    id?: number;
    username?: string;
    position?: Vector3;
    team: number;
    isControlled?: boolean
    onFire?(position: Vector3, team: number): void;
    onMovement?(position: Vector3): void;
    setWeaponSlot?(newSlot: number): void;
}

// export interface IRigidBodyData {
//     type: string
// }

const Player = ({ id, username, position, team, onFire, onMovement, setWeaponSlot, isControlled }: IPlayerProps) => {

    const ref = useRef<RapierRigidBody>(null!);

    const [controlKeys, getKeys] = useKeyboardControls();

    const movementController = (up: boolean, down: boolean, left: boolean, right: boolean) => {

        if (ref.current) {

            const speed = 4;

            ref.current.setLinvel(new Vector3(), true);
            const velocity = new Vector3();
            if (left) {
                velocity.x -= 1;
            }
            if (right) {
                velocity.x += 1;
            }
            if (up) {
                velocity.y += 1;
            }
            if (down) {
                velocity.y -= 1;
            }

            velocity.setLength(speed);

            ref.current.setLinvel(velocity, true);
        }
    }


    useFrame(() => {
        if (isControlled) {
            const { up, down, left, right, select1, select2, select3, shoot, hitscan } = getKeys();
            movementController(up, down, left, right);

            const playerPosition = vec3(ref?.current?.translation());

            if (select1 && setWeaponSlot) {
                setWeaponSlot(1)
            }

            if (select2 && setWeaponSlot) {
                setWeaponSlot(2)
            }

            if (select3 && setWeaponSlot) {
                setWeaponSlot(3)
            }

            if (onMovement) {
                onMovement(playerPosition);
            }

            if (shoot) {
                if (onFire) {
                    onFire(playerPosition, team);
                }
            }

            // стрельба проджектайлами и хитсканом должна быть прописана на одно и то же нажатие, что именно полетит - зависит от выбора в инвентаре

            if (hitscan) {
                // const aimingPoint = new Vector3(pointer.x, pointer.y / viewport.aspect, 0);
                // aimingPoint.setLength(5);
                // aimingPoint.x += playerPosition.x;
                // aimingPoint.y += playerPosition.y;
                // const laser = new Laser(
                //     playerPosition,
                //     aimingPoint,
                //     `${1337}-${Date.now()}`
                // )
                // setLasers((lasers) => [...lasers, laser])
            }
        }
    });


    const [hp, setHp] = useState<number>(100);

    useEffect(() => {
        const data = {
            type: 'player',
            team: team,
            hp: hp,
            id: id
        }
        ref.current.userData = data;
        if (hp===0){
            ref.current.setEnabled(false);
        }
    }, [hp]);

    return (
        <>
            <RigidBody
                ref={ref}
                scale={0.5}
                position={[-2, 0, 0]}
                colliders="hull"
                friction={1}
                linearDamping={10}
                angularDamping={1}
                lockRotations
            // userData={data}
            >

                <SpriteAnimator
                    fps={2}
                    startFrame={0}
                    loop={true}
                    autoPlay={true}
                    textureImageURL={'./assets/test/Sprite-0001.png'}
                    textureDataURL={'./assets/test/Sprite-0001.json'}
                    alphaTest={0.01}
                // pause={}
                />

                <BallCollider args={[0.5]} restitution={0}
                    onIntersectionEnter={(e) => {
                        const data: any = e.other.rigidBody?.userData;
                        const target = e.target.rigidBody;
                        if (data.type === "projectile") {
                            const damage = data.team === team ? data.damage / 2 : data.damage;
                            if (hp - damage < 0) {
                                setHp(0);
                                // target?.setEnabled(false);
                                // ref.current.setEnabled(false);
                            } else {
                                setHp(hp - damage);
                            }
                        }
                        if (data.type === "zone") {
                            // console.log(target.activeEvents())
                        }
                    }} />
                <HealthBar value={hp} color={0xff0000} />
            </RigidBody>
        </>
    );
}

export default Player;
