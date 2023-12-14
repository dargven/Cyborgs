import { useContext, useEffect, useState } from "react";
import "./ScoreMenu.css";
import { TTeamUser } from "../../modules/Server/types";
import { ServerContext } from "../../App";

const ScoreMenu = () => {

    const server = useContext(ServerContext);
    const [users, setUsers] = useState<TTeamUser[]>([
        {name: 'Dimon-Dominator', teamId: 1, score: 26, deaths: -10, status: 'krutoy paren'},
        {name: 'Hikita', teamId: 1, score: 26, deaths: -10, status: 'krutoy paren'},
        {name: 'lapaigne', teamId: 1, score: 26, deaths: 2, status: 'dead'},
        {name: 'CashemereGateKeper', teamId: 1, score: 26, deaths: 3, status: 'dead'},
        {name: 'Ruthik', teamId: 1, score: 0, deaths: 10, status: 'krutoy paren'},

        {name: 'dargven', teamId: 0, score: 1, deaths: 100, status: 'ne krutoy paren'},
        {name: 'бот Виталя', teamId: 0, score: 0, deaths: 10, status: 'bot'},
        {name: 'бот Витя', teamId: 0, score: 0, deaths: 5, status: 'dead bot'},
        {name: 'бот Пётр', teamId: 0, score: 0, deaths: 6, status: 'dead bot'},
        {name: 'бот Рустам', teamId: 0, score: 0, deaths: 10, status: 'super bot'},
    ]);

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