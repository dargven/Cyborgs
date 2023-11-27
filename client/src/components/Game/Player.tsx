import { SpriteAnimator, useKeyboardControls } from "@react-three/drei";
import { BallCollider, RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import HealthBar from "./HealthBar";
import { useFrame } from "@react-three/fiber";

interface IPlayerProps {
    token: string;
    position?: Vector3;
    velocity?: Vector3;
    teamId: number;
    isControlled?: boolean
    onFire?(position: Vector3, team: number): void;
    onMovement?(position: Vector3): void;
    setWeaponSlot?(newSlot: number): void;
    getPosVel?(position: Vector3, velocity: Vector3): void;
}

const Player = ({ velocity = new Vector3(),  position, teamId, onFire, onMovement, setWeaponSlot, getPosVel, isControlled, token }: IPlayerProps) => {

    const ref = useRef<RapierRigidBody>(null!);

    const [isShooting, setShooting] = useState<boolean>(false);

    const [controlKeys, getKeys] = useKeyboardControls();

    const movementController = (up?: boolean, down?: boolean, left?: boolean, right?: boolean) => {

        if (ref.current) {

            const speed = 4;

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
            // console.log(velocity, token);

            ref.current.setLinvel(velocity, true);
            if (getPosVel && isControlled) {
                getPosVel(ref.current.translation() as Vector3, ref.current.linvel() as Vector3);
            }
        }
    }

    useEffect(() => {
        if (isControlled) {
            const mouseDownHandler = (e: MouseEvent) => {
                if (e.button === 0) {
                    setShooting(true);
                }
            }
            const mouseUpHandler = (e: MouseEvent) => {
                if (e.button === 0) {
                    setShooting(false);
                }
            }

            document.addEventListener("mousedown", mouseDownHandler);
            document.addEventListener("mouseup", mouseUpHandler);

            return () => {
                document.removeEventListener("mousedown", mouseDownHandler);
                document.removeEventListener("mouseup", mouseUpHandler);
            }
        }
    });

    useFrame(() => {
        if (isControlled) {
            const { up, down, left, right, select1, select2, select3, shoot, hitscan } = getKeys();
            movementController(up, down, left, right);

            const playerPosition = vec3(ref.current?.translation());

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

            if (shoot || isShooting) {
                if (onFire) {
                    onFire(playerPosition, teamId);
                }
            }

        } else {
            movementController();
        }
    });

    const [hp, setHp] = useState<number>(100);

    useEffect(() => {
        const data = {
            type: 'player',
            team: teamId,
            hp: hp,
        }
        ref.current.userData = data;
        if (hp === 0) {
            ref.current.setEnabled(false);
        }
    }, [hp, teamId]);

    return (
        <>
            <RigidBody
                ref={ref}
                scale={0.5}
                position={position}
                colliders="hull"
                friction={1}
                linearDamping={10}
                angularDamping={1}
                lockRotations
            >

                <SpriteAnimator
                    fps={2}
                    startFrame={0}
                    loop={true}
                    autoPlay={true}
                    textureImageURL={'./assets/test/Sprite-0001.png'}
                    textureDataURL={'./assets/test/Sprite-0001.json'}
                    alphaTest={0.01}
                />

                <BallCollider args={[0.5]} restitution={0}
                    onIntersectionEnter={(e) => {
                        const data: any = e.other.rigidBody?.userData;
                        if (data.type === "projectile") {
                            const damage = data.team === teamId ? data.damage / 2 : data.damage;
                            if (hp - damage < 0) {
                                setHp(0);
                            } else {
                                setHp(hp - damage);
                            }
                        }
                    }} />
                <HealthBar value={hp} color={0xff0000} />
            </RigidBody>
        </>
    );
}

export default Player;
