import { Texture, TextureLoader, Vector3 } from "three";
import MakeSprite from "../Sprites/MakeSprite";
import MapObjects from "./MapObjects";
import LightMap from "./LightMap";
import { ITextureObject } from "../Scene";
import { useRef, useState } from "react";

interface IMapProps {
    texture: Texture;
}

const Map = ({ texture }: IMapProps) => {
    const textureLoader = new TextureLoader();
    const glass = textureLoader.load('./assets/Map parts/Glass.png');
    const glassTexture = useRef<ITextureObject>({
        "glass": glass
    })

    return (
        <group>
            <group scale={[81, 61, 1]} position={[0, 0, 0]}>
                <MakeSprite texture={texture} />
            </group>
            <MapObjects textures={glassTexture.current.glass} position={new Vector3()} />
            <LightMap />
        </group>
    );
}

export default Map;