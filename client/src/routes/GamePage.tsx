import React from "react";
import Chat from "../components/Chat/Chat";
import Game from "../components/Game/Game";

const GamePage = () => {

    const KEY_ESC = 27;

    document.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.keyCode === KEY_ESC) {
            alert('5345345')
        }
    });

    return (
        <React.Fragment>
            <Chat/>
            <Game/>
        </React.Fragment>
    );
}

export default GamePage;