import { PROJECTILE } from "../../assets/images";
import MakeSprite from "./MakeSprite";
import { Vector3, Mesh } from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

interface IProjectiileProps {
    initialSpeed?: number;
    // direction: Vector3;
    initialPosition: Vector3;
}

const Progectile = (props: IProjectiileProps) => {
    const bulletRef = useRef<Mesh>(null!);
    const [isActive, setActive] = useState<boolean>(true);

    const [speed, setSpeed] = useState<number>(props.initialSpeed ? props.initialSpeed : 10);

    useFrame((clock, delta) => {
        if (isActive) {
            bulletRef.current.position.x -= delta * speed;
            setSpeed(speed => speed += 2);
            if (speed >= 100) {
                setActive(false);
            }
        }
    });

    return isActive ? (
        <mesh ref={bulletRef}>
            <MakeSprite texture={PROJECTILE} position={props.initialPosition} rotation={[Math.PI / 2, -Math.PI, Math.PI]} scale={0.5} />
        </mesh>
    ) : <></>;

}

export default Progectile;