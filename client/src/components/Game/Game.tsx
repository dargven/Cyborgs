import { Container, Stage } from "@pixi/react";
import Scene from "./Scene";
import { useState } from "react";

const Game = () => {
    const [isMenu, setIsMenu] = useState<boolean>(true);

    return (
        <Stage width={window.innerWidth} height={window.innerHeight} style={{ "position": "absolute" }} options={{ backgroundColor: 0x002200 }}>
            <Container>
                <Scene />
            </Container>
        </Stage>
    );
}



export default Game;