import {useState} from "react";
import Game from "../components/Game/Game";
import NavButton from "../components/navButton";
import Chat from "../components/Chat/Chat";
import "../popUpMenu.css";
import "../TeamSelect.css";
import useKeyHandler from "../hooks/useKeyHandler";

const GamePage = () => {
    const [stopMove, setStopMove] = useState({
        isPopupVisible: false,
        isChatClicked: false,
        blockMove: false
    });

    const [team, setTeam] = useState<number>(0);

    const Test = () => {
        setStopMove((prevState) => ({
            ...prevState,
            blockMove: true,
            isChatClicked: true
        }));
    }

    console.log(stopMove.isPopupVisible, "Меню")
    console.log(stopMove.isChatClicked, "Чат")
    console.log(stopMove.blockMove, "Управление")

    const handleKeyPress = () => {
        setStopMove((prevState) => ({
            ...prevState,
            isPopupVisible: !stopMove.isPopupVisible,
            blockMove: !stopMove.blockMove
        }));
    };



    useKeyHandler(27, handleKeyPress);

    return (
        <div>
            <Chat Test={Test}/>

            {team ? (
                <Game/>
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

            {stopMove.isPopupVisible && (
                <div
                    className="popUpMenu"
                    onClick={() =>
                        setStopMove((prevState) => ({
                            ...prevState,
                            isPopupVisible: false,
                            blockMove: false
                        }))}
                >
                    <div
                        className="popUpMenu__content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() =>
                                setStopMove((prevState) => ({
                                    ...prevState,
                                    isPopupVisible: false,
                                    blockMove: false
                                }))}
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
