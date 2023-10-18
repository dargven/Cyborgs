import { RobotTexture } from "../../assets/images";
import MakeSprite from "./MakeSprite";
import { Vector3, SpriteMaterial, Sprite, Mesh } from "three";
import { useRef } from "react";

interface IPRobotStats {
    position?: Vector3;
}

const Robot = (props: IPRobotStats) => {

    const healthbarRef = useRef<Sprite>(null!);
    const robotRef = useRef<Mesh>(null!);


    return (
        <mesh ref  ={robotRef} scale ={0.5} position={props.position} >
        
        <group position={new Vector3(-2, 0.1, 1.3)} rotation={[Math.PI / 2, -Math.PI, Math.PI]} scale={new Vector3(1, 0.25, 0)}>
                <sprite material={new SpriteMaterial({ color: 0x0000FF,})} ref={healthbarRef} />
        </group>
        <MakeSprite texture={RobotTexture} position={new Vector3(-2, 0.1, 2)} rotation={[Math.PI / 2, Math.PI, Math.PI + (Math.PI/2)]} />
        </mesh>
    );
}

export default Robot;