import MakeSprite from "./MakeSprite";
import { Texture } from "three";
import { Vector3, Mesh } from "three";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

interface IProjectiileProps {
    initialSpeed?: number;
    direction: Vector3;
    initialPosition: Vector3;
    texture: Texture;
}

const Progectile = (props: IProjectiileProps) => {
    const bulletRef = useRef<Mesh>(null!);
    const [isActive, setActive] = useState<boolean>(true);

    const [speed, setSpeed] = useState<number>(props.initialSpeed ? props.initialSpeed : 10);

    const bulletDirection = props.direction;
    const { mouse } = useThree()
    bulletDirection.normalize();

    useFrame((clock, delta) => {
        if (isActive) {
            bulletRef.current.position.lerp(bulletDirection.set(mouse.x, mouse.y, 0), .5)
            bulletRef.current.position.x += delta * speed * bulletDirection.x;
            bulletRef.current.position.y += delta * speed * bulletDirection.y;
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