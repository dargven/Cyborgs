import MakeSprite from "./MakeSprite";
import { SADTROLLFACE, TROLLFACE } from "../../assets/images";
import { Mesh, Vector3, Sprite, SpriteMaterial } from "three";
import { EControls } from "./Game";
import { useRef, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

interface IPlayerProps {
    id?: number;
    username?: string;
    hp?: number;
    isAlive?: true | false;
    position?: Vector3;
}

const Player = (props: IPlayerProps) => {
    const playerRef = useRef<Mesh>(null!);
    const healthbarRef = useRef<Sprite>(null!);

    const [isAlive, setIsAlive] = useState<boolean>(props.isAlive ? true : false);
    const [hp, setHp] = useState<number>(100);

    const leftPressed = useKeyboardControls((state) => state[EControls.left]);
    const rightPressed = useKeyboardControls((state) => state[EControls.right]);
    const upPressed = useKeyboardControls((state) => state[EControls.up]);
    const downPressed = useKeyboardControls((state) => state[EControls.down]);
    const shootPressed = useKeyboardControls((state) => state[EControls.shoot]);

    const handleMovement = () => {
        if (isAlive) {

            const postion = playerRef.current.position;
            if (leftPressed) {
                playerRef.current.position.set(postion.x - 0.025, postion.y, postion.z);
            }
            if (rightPressed) {
                playerRef.current.position.set(postion.x + 0.025, postion.y, postion.z);
            }
            if (upPressed) {
                playerRef.current.position.set(postion.x, postion.y, postion.z - 0.025);
            }
            if (downPressed) {
                playerRef.current.position.set(postion.x, postion.y, postion.z + 0.025);
            }
            if (shootPressed) {
                takeDamage(6);
                healthbarRef.current.scale.set(hp / 100, 1, 0);
            }
        }
    }

    const takeDamage = (damage: number) => {
        setHp(hp - damage < 0 ? 0 : hp - damage);
        if (hp <= 0) {
            setIsAlive(false);
        }
    }

    useFrame(() => {
        handleMovement();
    });

    return (
        <mesh ref={playerRef} scale={0.5} position={props.position}>
            <group position={new Vector3(0, 0.1, -0.75)} rotation={[Math.PI / 2, -Math.PI, Math.PI]} scale={new Vector3(1, 0.25, 0)}>
                <sprite material={new SpriteMaterial({ color: 0xff0000 })} ref={healthbarRef} />
            </group>

            {isAlive ? <MakeSprite texture={TROLLFACE} position={new Vector3(0, 0.1, 0)} rotation={[Math.PI / 2, -Math.PI, Math.PI]} /> :
                <MakeSprite texture={SADTROLLFACE} position={new Vector3(0, 0.1, 0)} rotation={[Math.PI / 2, -Math.PI, Math.PI]} isCollider={false} />}

        </mesh>
    );
}

export default Player;