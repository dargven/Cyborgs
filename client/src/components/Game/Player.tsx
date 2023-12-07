import { SpriteAnimator, useKeyboardControls } from "@react-three/drei";
import { BallCollider, RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import HealthBar from "./HealthBar";
import { useFrame } from "@react-three/fiber";
import { TPlayer } from "../../modules/Server/types";

export interface IPlayerProps {
    token: string;
    position?: Vector3;
    velocity?: Vector3;
    teamId: 0 | 1 | null;
    isControlled?: boolean
    hp: number;
    onFire?(position: Vector3, team: number): void;
    onMovement?(position: Vector3): void;
    getPosVel?(position: Vector3, velocity: Vector3): void;
    getMyPlayer?(player: TPlayer): void;
}



const Player = ({
    velocity = new Vector3(),
    position,
    teamId,
    isControlled,
    token,
    hp,
    onFire,
    onMovement,
    getPosVel,
    getMyPlayer,
}: IPlayerProps) => {

    const ref = useRef<RapierRigidBody>(null!);

    const [isShooting, setShooting] = useState<boolean>(false);

    const [controlKeys, getKeys] = useKeyboardControls();

    const [state, setState] = useState<TPlayer>({
        x: vec3(ref.current?.translation()).x,
        y: vec3(ref.current?.translation()).y,
        vx: vec3(ref.current?.linvel()).x,
        vy: vec3(ref.current?.linvel()).y,
        dx: 0,
        dy: 0,
        hp,
        token,
        teamId
    });

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
            if (getMyPlayer) {
                getMyPlayer(state);
            }

            document.addEventListener("mousedown", mouseDownHandler);
            document.addEventListener("mouseup", mouseUpHandler);

            return () => {
                document.removeEventListener("mousedown", mouseDownHandler);
                document.removeEventListener("mouseup", mouseUpHandler);
            }
        }
    }, [state]);

    useFrame(() => {
        if (isControlled) {
            const { up, down, left, right, shoot } = getKeys();
            movementController(up, down, left, right);

            const playerPosition = vec3(ref.current?.translation());

            if (onMovement) {
                onMovement(playerPosition);
            }

            if (shoot || isShooting) {
                if (onFire) {
                    onFire(playerPosition, 0);
                }
            }

            setState({
                ...state, x: vec3(ref.current?.translation()).x,
                y: vec3(ref.current?.translation()).y,
                vx: vec3(ref.current?.linvel()).x,
                vy: vec3(ref.current?.linvel()).y,
            });

        } else {
            movementController();
        }
    });

    useEffect(() => {
        const data = {
            type: 'player',
            team: teamId,
            hp: state.hp,
        }

        ref.current.userData = data;

        if (state.hp === 0) {
            ref.current.setEnabled(false);
        }

    }, [state]);

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
                                setState({ ...state, hp: 0 });
                            } else {
                                setState({ ...state, hp: hp - damage });
                            }
                        }
                    }} />
                <HealthBar value={hp} color={0xff0000} />
            </RigidBody>
        </>
    );
}

export default Player;
