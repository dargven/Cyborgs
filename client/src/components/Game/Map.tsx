import React, { useEffect, useState } from "react";
import { Vector3 } from "three";
import MakeSprite from "./MakeSprite";
import { FL, WALL, LUC, RUC, LDC, RDC, COL, TEST } from "./assets/image";
import { TMap } from "./Types";

function Map({ scale }: TMap) {
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

    useEffect(() => {
        const sprites = [];

        for(let row = 0; row < map.length; row++) {
            for(let col = 0; col < map[row].length; col++) {
                const tileType = map[row][col];

                let tile;
                switch (tileType) {
                    case 'fl':
                        tile = <MakeSprite texture={FL} position={new Vector3(col, row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'WA':
                        tile = <MakeSprite texture={WALL} position={new Vector3(col, row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'WL':
                        tile = <MakeSprite texture={WALL} rotation={[0, 0, Math.PI/2]} position={new Vector3(col, row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'WR':
                        tile = <MakeSprite texture={WALL} rotation={[0, 0, Math.PI/2]} position={new Vector3(col, row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'LU':
                        tile = <MakeSprite texture={LUC} position={new Vector3(col, row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'RU':
                        tile = <MakeSprite texture={RUC} position={new Vector3(col, row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'LD':
                        tile = <MakeSprite texture={LDC} position={new Vector3(col, row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'RD':
                        tile = <MakeSprite texture={RDC} position={new Vector3(col, row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    case 'COL':
                        tile = <MakeSprite texture={COL} position={new Vector3(col, row, 0)} scale={scale} key={`${row}-${col}`}/>
                        break;
                    default:
                        tile = <MakeSprite texture={FL} position={new Vector3(col, row, 0)} scale={scale} key={`${row}-${col}`}/>
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