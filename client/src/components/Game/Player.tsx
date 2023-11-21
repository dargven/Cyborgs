import { useKeyboardControls } from "@react-three/drei";
import { BallCollider, RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { TextureLoader, Vector3 } from "three";
import HealthBar from "./HealthBar";
import { useFrame, useThree } from "@react-three/fiber";
import { Laser } from "../../modules/Game/entities";
import { Animator } from "./sprites/Animator";
import { IZonePlayer } from "./Zone";
import MakeSprite from "./MakeSprite";

interface IPlayerProps {
    id?: number;
    username?: string;
    position?: Vector3;
    team: number;
    isControlled?: boolean
    onFire?(position: Vector3, team: number): void;
    onMovement?(position: Vector3): void;
    setWeaponSlot?(newSlot: number): void;
    getDirection?(): Vector3;
    playerRotation?: number;
}

const Player = ({ id, username, position, team, onFire, onMovement, setWeaponSlot, isControlled, playerRotation, getDirection }: IPlayerProps) => {

    const ref = useRef<RapierRigidBody>(null!);

    const [isMoving, setMoving] = useState<boolean>(false)

    const [isShooting, setShooting] = useState<boolean>(false);
    const [rot, setRot] = useState<number>(playerRotation ?? 0);

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

            setMoving(
                vec3(ref.current.linvel()).length() !== 0
            )
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
    }, []);

    useFrame(() => {
        if (isControlled) {

            if (getDirection) {
                const dir = getDirection();
                setRot(Math.atan2(dir.y, dir.x));
            }

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

            if (shoot || isShooting) {
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
        if (hp === 0) {
            ref.current.setEnabled(false);
        }
    }, [hp]);






    // useEffect(() => {
    //     setMoving(
    //         vec3(ref.current.linvel()).length() === 0
    //     )
    //     console.log(isMoving)
    // },[ref.current, isMoving])
    const textureLoader = new TextureLoader();
    const Corpse = textureLoader.load('./assets/players/sprite corpse test.png');
    return (
        <>
            <RigidBody
                ref={ref}
                scale={1}
                position={[-2, 0, 0]}
                colliders="hull"
                friction={1}
                linearDamping={10}
                angularDamping={1}
                lockRotations
            // userData={data}
            >
                {hp?<Animator
                    
                    fps={13}
                    startFrame={0}
                    loop={true}
                    autoPlay={true}
                    textureImageURL={'./assets/players/sprite metall cop move m .png'}
                    textureDataURL={'./assets/players/sprite metall cop move m .json'}
                    alphaTest={0.01}
                    materialRotation={rot}
                    pause={!isMoving}
                />:<MakeSprite texture={Corpse}></MakeSprite>}
            
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
                        }
                    }} />
                <HealthBar value={hp} color={0xff0000} />
            </RigidBody>
        </>
    );
}

export default Player;
