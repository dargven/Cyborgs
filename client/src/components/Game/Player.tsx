import MakeSprite from "./MakeSprite";
import { SADTROLLFACE, TROLLFACE, HPBack } from "../../assets/images";
import { Group, Texture, TextureLoader } from "three";
import { Mesh, Vector3, Sprite, SpriteMaterial } from "three";
import { useEffect, useRef, useState } from "react";
import HealthBar from "./HealthBar";

export interface IPlayerProps {
    id?: number;
    username?: string;
    hp?: number;
    isAlive?: true | false;
    position?: Vector3;
}

const Player = (props: IPlayerProps) => {
    const playerRef = useRef<Group>(null!);
    // const healthbarRef = useRef<Sprite>(null!);

    const [isAlive, setIsAlive] = useState<boolean>(true);
    const [hp, setHp] = useState<number>(100);

    const textureLoader = new TextureLoader();
    const TTROLLFACE = textureLoader.load(TROLLFACE);
    const TSADTROLLFACE = textureLoader.load(SADTROLLFACE);

    const [textures, setTextures] = useState<Texture[]>([TTROLLFACE, TSADTROLLFACE]);

    return (
        <group ref={playerRef} scale={0.5} position={props.position}>

            <HealthBar />

            {/* <MakeSprite texture={isAlive ? TTROLLFACE : TSADTROLLFACE} position={new Vector3(0, 0, 0.1)} isCollider={isAlive} isSphere={true} /> */}
           {/* <sprite>
                {isAlive ?
                    <spriteMaterial map={textures[0]} /> :
                    <spriteMaterial map={textures[1]} />
                }
            </sprite>*/}
            < MakeSprite texture={isAlive ? TTROLLFACE : TSADTROLLFACE} position={new Vector3(0, 0, 0.1)}  isSphere={true}/>
        </group>
    );
}

export default Player;