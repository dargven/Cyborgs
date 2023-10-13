import { Container, Stage } from "@pixi/react";
import Scene from "./Scene";
import { useState } from "react";

const Game = () => {
    return (
        <Stage width={window.innerWidth} height={window.innerHeight} style={{ "position": "absolute" }} options={{ backgroundColor: 0x222288 }}>
            <Container>
                <Scene />
            </Container>
        </Stage>
    );
}



export default Game;