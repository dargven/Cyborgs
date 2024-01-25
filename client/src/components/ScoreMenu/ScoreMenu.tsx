import { useContext, useEffect, useState } from "react";
import { TTeamUser } from "../../modules/Server/types";
import { ServerContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./ScoreMenu.css";

const ScoreMenu = () => {

  const server = useContext(ServerContext);
  const navigate = useNavigate();

  const [isScoreVisible, setIsScoreVisible] = useState(false);
  const [users, setUsers] = useState<TTeamUser[]>([]);

  const updateScore = async () => {
    const sceneFromServer = await server.getScene();
    if (sceneFromServer && sceneFromServer.players) {
      const usersFromServer = sceneFromServer.players.map((player) => ({
        teamId: player.teamId,
        name: player.name,
        score: player.score,
        status: player.status,
        deaths: player.deaths,
      }));
      setUsers(usersFromServer);
    }
    else {
      if (server.error.code === 1002) {
        navigate("/login", { replace: true });
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(updateScore, 2500);
    return () => {
      clearInterval(interval);
    };
  }, []);

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

  const HeaderScore = () => (
    <div className="header">
      <span className="header-item name">Player</span>
      <span className="header-item status">Status</span>
      <span className="header-item score">Score</span>
      <span className="header-item deaths">Deaths</span>
    </div>
  );

  return (
    <>
      {
        isScoreVisible && (
          <div className="Back">
            <div className="Teams">
              
              <HeaderScore />
              <div className="firstTeam">
                {users
                  .filter(user => user.teamId === 0)
                  .sort((a, b) => b.score - a.score)
                  .map((user) => (
                    <p className="information">
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
                  .sort((a, b) => b.score - a.score)
                  .map((user) => (
                    <p className="information">
                      <span className="name">{user.name} </span>
                      <span className="status">{user.status}</span>
                      <span className="score">{user.score}</span>
                      <span className="deaths">{user.deaths}</span>
                    </p>
                  ))}
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default ScoreMenu;