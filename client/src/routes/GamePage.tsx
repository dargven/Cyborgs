import {useContext, useEffect, useState} from "react";
import {ServerContext} from "../App";
import Game from "../components/Game/Game";
import useKeyHandler from "../hooks/useKeyHandler";
import NavButton from "../components/navButton";
import Chat from "../components/Chat/Chat";
import ScoreMenu from "../components/ScoreMenu/ScoreMenu";
import { TTeam } from "../modules/Server/types";
import "../popUpMenu.css";
import "../TeamSelect.css";

const GamePage = () => {

    const server = useContext(ServerContext);
    const [tScore, setTScore] = useState<TTeam | null>(null)
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

    const updateTeamScore = async () => {
        const teamScore = await server.getScene();
        if (teamScore?.teams) {
            setTScore(teamScore.teams)
            console.log(teamScore.teams)
        }
      }

      useEffect(() => {
        const interval = setInterval(updateTeamScore, 2500);
        return () => {
            clearInterval(interval);
        };
    }, []);

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
            <div className="teamScore">
                <div className="firstTeam">
                    {tScore?.team_id == 0 ? tScore.team_score : 0}
                </div>
                <div className="secondName">
                    {tScore?.team_id == 1 ? tScore.team_score : 0}
                </div>
            </div>
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
