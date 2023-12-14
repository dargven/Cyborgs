import { Texture, TextureLoader, Vector3 } from "three";
import MakeSprite from "../Sprites/MakeSprite";
import MapObjects from "./MapObjects";
import LightMap from "./LightMap";
import { ITextureObject } from "../Scene";
import { useRef, useState } from "react";
import CollidersPositions from "./CollidersPositions";
import Obstacle from "./Obstacle";

interface IMapProps {
    texture: Texture;
}

const Map = ({ texture }: IMapProps) => {
    const textureLoader = new TextureLoader();
    const glass = textureLoader.load('./assets/Map parts/Glass.png');
    const glassTexture = useRef<ITextureObject>({
        "glass": glass
    })

    const colliders = CollidersPositions();
    let colliderKeyCounter = 0;
    const generateColliderKey = () => {
        const key = `collider-${colliderKeyCounter}`;
        colliderKeyCounter++;
        return key;
    };

    return (
        <group>
            <group scale={[56, 49, 1]} position={[4.5, 6, 0]}>
                <MakeSprite texture={texture} />
            </group>
            <MapObjects textures={glassTexture.current.glass} position={new Vector3()} />
            <LightMap />
            {colliders.map(collider =>
                    <Obstacle
                        key={generateColliderKey()}
                        {...collider}
                    />
                )}
        </group>
    );
}

export default Map;