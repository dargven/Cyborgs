import {useContext, useState} from "react";
import {ServerContext} from "../App";
import Game from "../components/Game/Game";
import useKeyHandler from "../hooks/useKeyHandler";
import NavButton from "../components/navButton";
import Chat from "../components/Chat/Chat";
import "../popUpMenu.css";
import "../TeamSelect.css";
import ScoreMenu from "../components/ScoreMenu/ScoreMenu";

const GamePage = () => {
    const server = useContext(ServerContext);
    const [stopMove, setStopMove] = useState({
        isPopupVisible: false,
        isChatClicked: false,
        blockMove: false,
        isSettingsVisible: false
    });

    const [team, setTeam] = useState<0 | 1 | null>(null);

    const handleTeam = async (teamId: 0 | 1) => {
        if(teamId == 0 || teamId == 1){
            const STeam = await server.selectTeam(teamId)
            if(STeam) {
                setTeam(teamId)
            }
        }
    }

    const StopMove = () => {
        setStopMove((prevState) => ({
            ...prevState,
            blockMove: true,
            isChatClicked: true
        }));
    }

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
            <Chat StopMove={StopMove}/>
            {team !== null ? (
                <>
                    <Game/>
                    <ScoreMenu/>
                </>
            ) : (
                <>
                    <button onClick={() => handleTeam(0)} className="Team1">
                        команда 1
                    </button>
                    <button onClick={() => handleTeam(1)} className="Team2">
                        команда 2
                    </button>
                </>
            )}
            {stopMove.isSettingsVisible && (
                <div className="SettingsBG">
                    <div className="Settings">
                        {/* <div className="slidecontainer">
                            <input type="range" min="1" max="100" value="50" className="slider" id="myRange"/>
                        </div> */}
                        <button onClick={() => {
                            setStopMove((prevState) => ({
                                    ...prevState,
                                    isSettingsVisible: false,
                                }))}}
                                className="popUpBtn"
                            >
                            Применить       
                        </button>
                    </div>
                </div>
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
                        <button onClick={() =>
                                setStopMove((prevState) => ({
                                    ...prevState,
                                    isPopupVisible: false,
                                    blockMove: false,
                                    isSettingsVisible: true
                                }))}
                            className="popUpBtn"    
                        >
                            Настройки
                        </button>
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
