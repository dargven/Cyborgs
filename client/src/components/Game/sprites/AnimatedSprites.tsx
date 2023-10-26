import { useFrame } from "@react-three/fiber";
import { Interface } from "readline";
import { Sprite, SpriteMaterial, Texture, TextureLoader } from "three";
import * as THREE from "three";


interface IFlipSpritesProps {
    spriteTexture: string,
    tilesHoriz: number,
    tilesVert: number
}

const FlipSprites = (props: IFlipSpritesProps) =>{

    let currentTile = 0 ;

    let map: Texture;
    let maxDisplayTime = 0;
    let elapsedTime = 0;
    let runningTileArrayIndex = 0;

    let playSpriteIndices: number[] = []; 



    map = new TextureLoader().load(props.spriteTexture);
    map.magFilter = THREE.NearestFilter;   // sharp pixel sprite
    map.repeat.set( 1/props.tilesHoriz, 1/props.tilesVert );
    




    /**
     * @param spriteTexture A sprite sheet with sprite tiles
     * @param tilesHoriz Horizontal number of tiles
     * @param tilesVert Vertical number of tiles
     */

    useFrame(
        () =>  loop([0,1,2,3,4,5,6,7,8], 1.5)
    )
    
    const update = (delta: number) => {
        elapsedTime += delta;

        if (maxDisplayTime > 0 && elapsedTime >= maxDisplayTime) {
            elapsedTime = 0;
            runningTileArrayIndex = (runningTileArrayIndex + 1) % playSpriteIndices.length;
            currentTile = playSpriteIndices[runningTileArrayIndex];

            const offsetX  = (currentTile % props.tilesHoriz) / props.tilesHoriz;
            const offsetY = (props.tilesVert - Math.floor(currentTile / props.tilesHoriz) -1 ) / props.tilesVert;

            map.offset.x = offsetX;
            map.offset.y = offsetY;
        }
    }
    const loop = (playSpriteIndices: number[], totalDuration: number) => {
        runningTileArrayIndex = 0;
        currentTile = playSpriteIndices[runningTileArrayIndex];
        maxDisplayTime = totalDuration / playSpriteIndices.length;
        elapsedTime = maxDisplayTime; // force to play new animation
    }

    update(0);

    const material = new SpriteMaterial({ map: map });

    return (
        <sprite material={material}>

        </sprite>
    )
        
    
}

export default FlipSprites;