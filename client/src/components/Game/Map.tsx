import React, { useEffect, useState } from "react";
import { Vector3 } from "three";
import MakeSprite from "./MakeSprite";
import { TextureLoader} from "three";
import { FL, WALL, LUC, RUC, LDC, RDC, COL, TEST } from "../../assets/images";

interface IMap {
    scale?: number
}

function Map({ scale }: IMap) {
    const map = [ //лучше поменять на цифры
        ['LU', 'WA', 'WA', 'WA', 'WA', 'WA', 'WA', 'WA', 'WA', 'RU'],
        ['WL', 'fl', 'fl', 'fl', 'fl', 'fl', 'fl', 'fl', 'fl', 'WR'],
        ['WL', 'fl', 'COL', 'fl', 'fl', 'fl', 'fl', 'COL', 'fl', 'WR'],
        ['WL', 'fl', 'fl', 'fl', 'fl', 'fl', 'fl', 'fl', 'fl', 'fl'],
        ['WL', 'fl', 'COL', 'fl', 'fl', 'fl', 'fl', 'COL', 'fl', 'WR'],
        ['WL', 'fl', 'fl', 'fl', 'fl', 'fl', 'fl', 'fl', 'fl', 'WR'],
        ['LD', 'WA', 'WA', 'WA', 'WA', 'WA', 'WA', 'WA', 'WA', 'RD'],
    ];

    const tileSize = 32;
    const [mapSprites, setMapSprites] = useState<JSX.Element[]>([]);
    const allMap = [];

    const textureLoader = new TextureLoader();
    const TFL = textureLoader.load(FL);
    const TWALL = textureLoader.load(WALL);
    const TLUC = textureLoader.load(LUC);
    const TRUC = textureLoader.load(RUC);
    const TLDC = textureLoader.load(LDC);
    const TRDC = textureLoader.load(RDC);
    const TCOL = textureLoader.load(COL);

    useEffect(() => {
        const sprites = [];

        for(let row = 0; row < map.length; row++) {
            for(let col = 0; col < map[row].length; col++) {
                const tileType = map[row][col];

                let tile;
                switch (tileType) {
                    case 'fl':
                        tile = <MakeSprite texture={TFL} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} isCollider={false}/>
                        break;
                    case 'WA':
                        tile = <MakeSprite texture={TWALL} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'WL':
                        tile = <MakeSprite texture={TWALL} rotation={[0, 0, Math.PI/2]} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'WR':
                        tile = <MakeSprite texture={TWALL} rotation={[0, 0, Math.PI/2]} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'LU':
                        tile = <MakeSprite texture={TLUC} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'RU':
                        tile = <MakeSprite texture={TRUC} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'LD':
                        tile = <MakeSprite texture={TLDC} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'RD':
                        tile = <MakeSprite texture={TRDC} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'COL':
                        tile = <MakeSprite texture={TCOL} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} colliderSize={[0.5, 0.5, 0.1]}/>
                        break;
                    default:
                        tile = <MakeSprite texture={TFL} position={new Vector3(col, -row, 0)} scale={scale} key={`${row}-${col}`} isCollider={false}/>
                }

                sprites.push(tile);
            }
        }

        setMapSprites(sprites)
    }, []);

    return(
        <group>
            {mapSprites}
        </group>
    )
}

export default Map;