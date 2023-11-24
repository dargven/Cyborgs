import {useContext, useState, useEffect } from "react";
import {ServerContext} from "../App";
import Game from "../components/Game/Game";
import NavButton from "../components/navButton";
import Chat from "../components/Chat/Chat";
import "../popUpMenu.css";
import "../TeamSelect.css";

const GamePage = () => {
    const server = useContext(ServerContext);
    const KEY_ESC = 27;
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [team, setTeam] = useState<number>(0);
    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.keyCode === KEY_ESC) {
            setIsPopupVisible(!isPopupVisible);
        }
      };

    const handleTeam = async (teamId: number) => {
        const STeam = await server.selectTeam(teamId)
        if(STeam) {
            setTeam(teamId)
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    });

    return (
        <div>
            {team ? (
                <Game />
            ) : (
                <>
                    <button onClick={() => handleTeam(1)} className="Team1">
                        команда 1
                    </button>
                    <button onClick={() => handleTeam(2)} className="Team2">
                        команда 2
                    </button>
                </>
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
