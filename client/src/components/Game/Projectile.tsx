import MakeSprite from "./MakeSprite";
import { Texture } from "three";
import { Vector3, Mesh } from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

interface IProjectiileProps {
    initialSpeed?: number;
    // direction: Vector3;
    initialPosition: Vector3;
    texture: Texture;
}

const Progectile = (props: IProjectiileProps) => {
    const bulletRef = useRef<Mesh>(null!);
    const [isActive, setActive] = useState<boolean>(true);

    const [speed, setSpeed] = useState<number>(props.initialSpeed ? props.initialSpeed : 10);

    useFrame((clock, delta) => {
        if (isActive) {
            bulletRef.current.position.x -= delta * speed;
            setSpeed(speed => speed += 8);
            if (speed >= 100) {
                setActive(false);
            }
        }
    });

    return isActive ? (
        <mesh ref={bulletRef}>
            <MakeSprite texture={props.texture} position={props.initialPosition} scale={0.5} />
        </mesh>
    ) : <></>;

}

export default Progectile;