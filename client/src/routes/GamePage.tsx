import { useState } from "react";
import Game from "../components/Game/Game";
import NavButton from "../components/navButton";
import Chat from "../components/Chat/Chat";
import "../popUpMenu.css";
import "../TeamSelect.css";
import useKeyHandler from "../hooks/useKeyHandler";
import { Link } from "react-router-dom";

const playButtonImage = process.env.PUBLIC_URL + "/assets/image/Robot_favikon.png";
const GamePage = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [team, setTeam] = useState<number>(0);

    const handleKeyPress = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    useKeyHandler(27, handleKeyPress);

    return (
        <div>
            {team ? (
                <>
                    <Game />
                    <Chat />
                    <button className="exit">
                        <Link to="/StartPage">
                            <img
                                src={playButtonImage}
                                alt="Play button"
                                className="exit-image"
                            />
                        </Link>
                    </button>
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
                </>
            ) : (
                <>
                    <button onClick={() => setTeam(1)} className="Team1">
                        команда 1
                    </button>
                    <button onClick={() => setTeam(2)} className="Team2">
                        команда 2
                    </button>
                </>
            )}
        </div>
    );
};

export default GamePage;