import { useRef } from "react";
import { Texture, TextureLoader, Vector3 } from "three";
import  {ITextureObject}  from "../Scene";
import MakeSprite from "../Sprites/MakeSprite";
import CollidersPositions from "./CollidersPositions";
import LightMap from "./LightMap";
import MapObjects from "./MapObjects";
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