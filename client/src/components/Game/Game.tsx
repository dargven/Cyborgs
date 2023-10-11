import { Stage } from "@pixi/react";
import Scene from "./Scene";

const Game = () => {
    return (
        <Stage width={window.innerWidth} height={window.innerHeight} options={{ backgroundColor: 0xee0000 }} style={{ "position": "absolute" }}>

        </Stage>
    );
}



export default Game;