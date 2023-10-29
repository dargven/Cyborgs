import React, { useEffect, useState } from "react";
import { Vector3 } from "three";
import MakeSprite from "./MakeSprite";
import { TextureLoader } from "three";
import { FL, WALL, LUC, RUC, LDC, RDC, COL, TEST, No_Texture, Space } from "../../assets/images";

interface IRoom {
    map: number[][];
    scale: number | undefined;
}

function Room({ map, scale} : IRoom) {
    const tileSize = 32;
    const [roomSprites, setRoomSprites] = useState<JSX.Element[]>([]);

    const textureLoader = new TextureLoader();
    const TSPACE = textureLoader.load(Space);
    const TFLOOR = textureLoader.load(FL);
    const TWALL = textureLoader.load(WALL);
    const TLUC = textureLoader.load(LUC);
    const TRUC = textureLoader.load(RUC);
    const TLDC = textureLoader.load(LDC);
    const TRDC = textureLoader.load(RDC);
    const TCOL = textureLoader.load(COL);
    const TNOTEXTURE = textureLoader.load(No_Texture);
  
    useEffect(() => {
      const sprites = [];
  
      for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
          const tileType = map[row][col];
  
          let tile;
          switch (tileType) {
            case 0:
                tile = <MakeSprite texture={TSPACE} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} isCollider={false} />
                break;
            case 1:
                tile = <MakeSprite texture={TFLOOR} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} isCollider={false}/>
                break;
            case 2:
                tile = <MakeSprite texture={TWALL} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} />
                break;
            // case 'WL':
            //     tile = <MakeSprite texture={TWALL}
            //         rotation={Math.PI / 2}
            //         position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} />
            //     break;
            // case 'WR':
            //     tile = <MakeSprite texture={TWALL}
            //         rotation={Math.PI / 2}
            //         position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} />
            //     break;
            // case 'LU':
            //     tile = <MakeSprite texture={TLUC} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} />
            //     break;
            // case 'RU':
            //     tile = <MakeSprite texture={TRUC} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} />
            //     break;
            // case 'LD':
            //     tile = <MakeSprite texture={TLDC} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} />
            //     break;
            // case 'RD':
            //     tile = <MakeSprite texture={TRDC} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} />
            //     break;
            // case 'COL':
            //     tile = <MakeSprite texture={TCOL} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} colliderSize={[0.5, 0.5, 0.1]} />
            //     break;
            default:
                tile = <MakeSprite texture={TNOTEXTURE} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} isCollider={false} />
        }

        sprites.push(tile);
        }
      }
  
      setRoomSprites(sprites);
    }, [map]);
  
    return <group>{roomSprites}</group>;
  }

  export default Room;