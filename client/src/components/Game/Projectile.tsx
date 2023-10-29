import MakeSprite from "./MakeSprite";
import { Vector3, Mesh, Texture } from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

interface IProjectiileProps {
    initialSpeed?: number;
    direction: Vector3;
    initialPosition: Vector3;
    texture: Texture;
}

const Projectile = (props: IProjectiileProps) => {
    // console.log(props.initialPosition)
    const bulletRef = useRef<Mesh>(null!);
    const [isActive, setActive] = useState<boolean>(true);

    const [speed, setSpeed] = useState<number>(props.initialSpeed ? props.initialSpeed : 10);

    useFrame((clock, delta) => {
        if (isActive) {
            setSpeed(speed => speed += 4);
            bulletRef.current.position.x += delta * speed * props.direction.x;
            bulletRef.current.position.y += delta * speed * props.direction.y;
        }
    });

    return isActive ? (
        <mesh ref={bulletRef}>
            <MakeSprite texture={props.texture} position={props.initialPosition} scale={0.5}  isSphere={true}/>
        </mesh>
    ) : <></>;

}

export default Projectile;