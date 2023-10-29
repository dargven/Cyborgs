import React, { useEffect, useState } from "react";
import { Vector3 } from "three";
import MakeSprite from "./MakeSprite";

interface IRoom {
    map: number[][];
    scale: number | undefined;
    textures: any;
}

function Room({ map, scale, textures} : IRoom) {
    const tileSize = 32;
    const [roomSprites, setRoomSprites] = useState<JSX.Element[]>([]);

    const {TSPACE, TFLOOR, TWALL, TSNOW, TGLASS, TNOTEXTURE} = textures;
  
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
            case 3:
                tile = <MakeSprite texture={TSNOW} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} isCollider={false}/>
                break;
            case 4:
                tile = <MakeSprite texture={TGLASS} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} />
                break;
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