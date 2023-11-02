import { Texture, Vector3 } from "three";
import MakeSprite from "./MakeSprite";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

interface IMapObjects {
    textures: Texture;
    position: Vector3;
}

const MapObjects = (props: IMapObjects) => {

    
    const sprites = [
        { position: new Vector3(-13, 1, 0), key: 'mainGlass1'},
        { position: new Vector3(-13, 2, 0), key: 'mainGlass2'},
        { position: new Vector3(-13, 3, 0), key: 'mainGlass3'},
        { position: new Vector3(-13, 4, 0), key: 'mainGlass4'},

        { position: new Vector3(-21, 6, 0), key: 'frontOfficeGlass1'},
        { position: new Vector3(-20, 6, 0), key: 'frontOfficeGlass2'},
        { position: new Vector3(-19, 6, 0), key: 'frontOfficeGlass3'},
        { position: new Vector3(-28, 11, 0), key: 'frontOfficeGlass4'},
        { position: new Vector3(-28, 12, 0), key: 'frontOfficeGlass5'},
        { position: new Vector3(-28, 13, 0), key: 'frontOfficeGlass6'},
        { position: new Vector3(-28, 15, 0), key: 'frontOfficeGlass7'},
        { position: new Vector3(-28, 16, 0), key: 'frontOfficeGlass8'},
        { position: new Vector3(-28, 17, 0), key: 'frontOfficeGlass9'},

        { position: new Vector3(12, -9, 0), key: 'windowGlass1'},
        { position: new Vector3(13, -9, 0), key: 'windowGlass2'},
        { position: new Vector3(14, -9, 0), key: 'windowGlass3'},
        { position: new Vector3(15, -9, 0), key: 'windowGlass4'},
        { position: new Vector3(16, -9, 0), key: 'windowGlass5'},
        { position: new Vector3(17, -9, 0), key: 'windowGlass6'},
        { position: new Vector3(18, -9, 0), key: 'windowGlass7'},
      ];

    return (
        <group>
            {sprites.map((sprite, key) => (
            <MakeSprite
                key={key}
                texture={props.textures}
                position={sprite.position}
                isCollider={false}
            />
            ))}
            {sprites.map((sprite, key) => 
                <RigidBody 
                    key={sprite.key}
                    type='fixed' 
                    userData={{
                        type: "Collider"
                    }}>
                    <CuboidCollider
                        position={sprite.position}
                        args={[0.5, 0.5, 0.5]}
                    />
                </RigidBody>
            )}
        
    </group>
    )
}

export default MapObjects;