import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group, Mesh, TextureLoader, Vector3 } from "three";
import Map from "./Map";
import Player, { IPlayerProps } from "./Player";
import { EControls } from "./Game";
import { useKeyboardControls } from "@react-three/drei";
import Projectile from "./Projectile"
import Robot from "./Robot";
import { PROJECTILE } from "../../assets/images";
import { Physics } from "@react-three/rapier";

interface ISceneProps {
    playerProps: IPlayerProps;
    cameraProps: {
        vSize: number;
        aspect: number;
    }
}

const Scene = (props: ISceneProps) => {
    const textureLoader = new TextureLoader();
    const TPROJECTILE = textureLoader.load(PROJECTILE);

    const scale = 1;


    // const sceneRef = useRef<Mesh>(null!);
    const playerRef = useRef<Mesh>(null!);

    const [bullets, setBullets] = useState<JSX.Element[]>([]);

    const { viewport, camera, pointer } = useThree();

    const vSize = props.cameraProps.vSize;
    const aspect = props.cameraProps.aspect;

    const handleShooting = (id: number, position: Vector3, direction: Vector3) => {
        const arr = [<Projectile key={`${id}-${bullets.length}`} initialPosition={position} texture={TPROJECTILE} direction={direction} />]
        setBullets(arr.concat(bullets));
        console.log(bullets.length);
    }

    return (
        <group>
            <Physics gravity={[0, 0, 0]} colliders="hull" debug>

                <ambientLight intensity={0.5} />

                <Player id={props.playerProps.id} callbacks={[handleShooting]} />

                {bullets}

                <Robot />

                <Map scale={scale} />
            </Physics>
        </group>
    );
}

export default Scene;