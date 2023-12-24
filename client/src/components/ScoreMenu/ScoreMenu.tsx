import { useContext, useEffect, useState } from "react";
import "./ScoreMenu.css";
import { TTeamUser } from "../../modules/Server/types";
import { ServerContext } from "../../App";
import { useNavigate } from "react-router-dom";

const ScoreMenu = () => {

    const server = useContext(ServerContext);
    const navigate = useNavigate();

    const [users, setUsers] = useState<TTeamUser[]>([]);

    const updateScore = async () => {
      const sceneFromServer  = await server.getScene();
        if (sceneFromServer && sceneFromServer.players) {
          const usersFromServer = sceneFromServer.players.map((player) => ({
            name: player.name,
            teamId: player.teamId,
            score: player.score,
            deaths: player.deaths,
            status: player.status,
          }));
          setUsers(usersFromServer);
        }
        else{
          if (server.error.code === 1002) {
            navigate("/login", {replace: true});
        }
        }

      } 

    useEffect(() => {
        const interval = setInterval(updateScore, 2500);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const HeaderScore = () => (
        <div className="header">
          <span className="header-item name">Player</span>
          <span className="header-item status">Status</span>
          <span className="header-item score">Score</span>
          <span className="header-item deaths">Deaths</span>
        </div>
      );

    const [isScoreVisible, setIsScoreVisible] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.code === "Tab") {
            setIsScoreVisible(true);
          }
        };
    
        const handleKeyUp = (event: KeyboardEvent) => {
          if (event.code === "Tab") {
            setIsScoreVisible(false);
          }
        };
    
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
          window.removeEventListener("keyup", handleKeyUp);
        };
      }, []);

    //Прилетает массив игроков:

    //Игрок Статус Счёт Смертей
    //REFLX   Умер   10       0

    return(
        <>
        {
            isScoreVisible && (
                <div className="Back" onClick={() => {setIsScoreVisible(false)}}>
                        <h3>SCORE</h3>
                    <HeaderScore/>
                    <div className="firstTeam">
                        {users
                        .filter(user => user.teamId === 0)
                        .map((user) => (
                            <p className="chat-message">
                                <span className="name">{user.name} </span>
                                <span className="status">{user.status}</span>
                                <span className="score">{user.score}</span>
                                <span className="deaths">{user.deaths}</span>
                            </p>
                        ))}
                    </div>
                    <div className="secondTeam">
                        {users
                        .filter(user => user.teamId === 1)
                        .map((user) => (
                            <p className="chat-message">
                                <span className="name">{user.name} </span>
                                <span className="status">{user.status}</span>
                                <span className="score">{user.score}</span>
                                <span className="deaths">{user.deaths}</span>
                            </p>
                        ))}
                    </div>
                </div>
            )
        }
        </>
    )
}

export default ScoreMenu;