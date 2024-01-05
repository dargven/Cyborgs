import { Texture, Vector3 } from "three";
import MakeSprite from "../Sprites/MakeSprite";
import Obstacle from "./Obstacle";

interface IMapObjects {
    texture: Texture;
}

const MapObjects = ({texture}: IMapObjects) => {


    const sprites = [
        { position: new Vector3(-13, 1, 0), key: 'mainGlass1', isDestructible: true },
        { position: new Vector3(-13, 2, 0), key: 'mainGlass2', isDestructible: true },
        { position: new Vector3(-13, 3, 0), key: 'mainGlass3', isDestructible: true },
        { position: new Vector3(-13, 4, 0), key: 'mainGlass4', isDestructible: true },

        { position: new Vector3(-21, 6, 0), key: 'frontOfficeGlass1', isDestructible: true },
        { position: new Vector3(-20, 6, 0), key: 'frontOfficeGlass2', isDestructible: true },
        { position: new Vector3(-19, 6, 0), key: 'frontOfficeGlass3', isDestructible: true },

        { position: new Vector3(12, -9, 0), key: 'windowGlass1', isDestructible: true },
        { position: new Vector3(13, -9, 0), key: 'windowGlass2', isDestructible: true },
        { position: new Vector3(14, -9, 0), key: 'windowGlass3', isDestructible: true },
        { position: new Vector3(15, -9, 0), key: 'windowGlass4', isDestructible: true },
        { position: new Vector3(16, -9, 0), key: 'windowGlass5', isDestructible: true },
        { position: new Vector3(17, -9, 0), key: 'windowGlass6', isDestructible: true },
        { position: new Vector3(18, -9, 0), key: 'windowGlass7', isDestructible: true },
    ];

    return (
        <group>
            {sprites.map((sprite, key) => (
                <MakeSprite
                    key={key}
                    texture={texture}
                    position={sprite.position}
                />
            ))}

            {sprites.map((sprite) =>
                <Obstacle
                    {...sprite}
                    args={[0.5, 0.5, 0.5]}
                    isDestructible
                />
            )}

        </group>
    )
}

export default MapObjects;