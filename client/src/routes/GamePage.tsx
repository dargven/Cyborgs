import { useState, useEffect } from "react";
import Game from "../components/Game/Game";
import NavButton from "../components/navButton";
import Chat from "../components/Chat/Chat";
import "../popUpMenu.css";

const GamePage = () => {
    const KEY_ESC = 27;
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [team, setTeam] = useState<number>(0);
    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.keyCode === KEY_ESC) {
          if (isPopupVisible) {
            setIsPopupVisible(false);
          } else {
            setIsPopupVisible(true);
          }
        }
      };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    });
    const openPopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };
    return (
        <div>
            {team ? (
                <Game />
            ) : (
                <div>
                    <button onClick={() => setTeam(1)} className="Team1">
                        команда 1
                    </button>
                    <button onClick={() => setTeam(2)} className="Team2">
                        команда 2
                    </button>
                </div>
            )}
            <Chat />

            {isPopupVisible && (
                <div
                    className="popUpMenu"
                    onClick={() => setIsPopupVisible(false)}
                >
                    <div
                        className="popUpMenu__content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsPopupVisible(false)}
                            className="popUpBtn"
                        >
                            Возобновить
                        </button>
                        <NavButton
                            to="/game"
                            text="Настройки"
                            className="popUpBtn"
                        />
                        <NavButton
                            to="/main"
                            text="Выход"
                            className="popUpBtn"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GamePage;
