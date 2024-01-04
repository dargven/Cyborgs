import { useKeyboardControls } from "@react-three/drei";
import { BallCollider, RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import HealthBar from "./HealthBar";
import { useFrame } from "@react-three/fiber";
import { TPlayer } from "../../../modules/Server/types";
import { Animator } from "../Sprites/Animator";
import React from "react";

export type TPlayerProps = {
    onFire(x: number, y: number): void;
    onMovement(x: number, y: number): void;
    updatePlayer(updated: TPlayer): void;
    getDirection(): Vector3;
    playerRotation?: number;
} & TPlayer;

// const sendHit = (hit: THit) => {
//     server.setHit(this.token,bulletId);
// }

const Player = ({
    x,
    y,
    vx,
    vy,
    dx,
    dy,
    teamId,
    token,
    hp,
    onMovement,
    onFire,
    updatePlayer,
    getDirection,
    playerRotation
}: TPlayerProps) => {

    const ref = useRef<RapierRigidBody>(null!);

    const [_, getKeys] = useKeyboardControls();

    const rot = useRef<number>(playerRotation ?? 0)
    // const [rot, setRot] = useState<number>(playerRotation ?? 0);

    const mouseShoot = useRef<boolean>(false);
    const state = useRef<TPlayer>({
        x,
        y,
        vx,
        vy,
        dx,
        dy,
        hp,
        token,
        teamId,
    });

    const [frameName, setFrameName] = useState('movement')

    const onEnd = ({}) => {
        if(!hp){
            if (frameName === 'movement') {
                setFrameName('corpse')
            }
        }
        
    }

    const movementController = (up?: boolean, down?: boolean, left?: boolean, right?: boolean) => {

        if (ref.current) {

            const speed = 4;
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

            if (velocity.length()) {
                state.current = {
                    ...state.current,
                    x: vec3(ref.current?.translation()).x,
                    y: vec3(ref.current?.translation()).y,
                    vx: vec3(ref.current?.linvel()).x,
                    vy: vec3(ref.current?.linvel()).y,
                    dx: Math.cos(rot.current),
                    dy: Math.sin(rot.current),
                };
                updatePlayer(state.current);
            }
        }
    }

    useEffect(() => {
        const mouseDownHandler = (e: MouseEvent) => {
            if (e.button === 0) {
                mouseShoot.current = true;
            }
        }
        const mouseUpHandler = (e: MouseEvent) => {
            if (e.button === 0) {
                mouseShoot.current = false;
            }
        }

        document.addEventListener("mousedown", mouseDownHandler);
        document.addEventListener("mouseup", mouseUpHandler);

        return () => {
            document.removeEventListener("mousedown", mouseDownHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
        }

    }, []);

    useFrame(() => {
        
        if (hp){
            const dir = getDirection();
            rot.current = Math.atan2(dir.y, dir.x);
            // setRot(Math.atan2(dir.y, dir.x));
        }
        
        const { up, down, left, right, shoot } = getKeys();
        movementController(up, down, left, right);

        onMovement(state.current.x, state.current.y);

        if (shoot || mouseShoot.current) {
            onFire(state.current.x, state.current.y);
        }
    });

    return (
        <group>
            <RigidBody
                ref={ref}
                scale={0.5}
                position={[x, y, 0]}
                colliders="hull"
                friction={1}
                linearDamping={10}
                angularDamping={1}
                lockRotations
                userData={{
                    type: 'player'
                }}
            >

                <Animator
                    fps={5}
                    startFrame={0}
                    loop={true}
                    onLoopEnd={onEnd}
                    frameName={frameName}
                    animationNames={['movement','corpse']}
                    autoPlay={true}
                    textureImageURL={'./assets/test/Cop.png'}
                    textureDataURL={'./assets/test/Cop.json'}
                    alphaTest={0.01}
                    materialRotation={rot.current}
                />


                <BallCollider
                    args={[0.5]}
                    restitution={0}
                    onIntersectionEnter={(e) => {
                        const data: any = e.other.rigidBody?.userData;
                        if (data.type === "bullet") {
                            if (state.current.hp - 20 < 0) {
                                state.current = {
                                    ...state.current,
                                    hp: 0
                                };
                                // sendHit(hit);
                            } else {
                                state.current = {
                                    ...state.current,
                                    hp: hp - 20
                                };
                                // sendHit(hit);
                                // в меня попали - отправь инфу на сервер
                            }
                        }
                    }} />
                <HealthBar value={state.current.hp} color={0xff0000} />
            </RigidBody>
        </group>
    );
}

export default Player;
