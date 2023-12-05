import { useContext, useState } from "react";
import "./ScoreMenu.css";
import { TTeamUser } from "../../modules/Server/types";
import { ServerContext } from "../../App";
import useKeyHandler from "../../hooks/useKeyHandler";

const ScoreMenu = () => {

    const server = useContext(ServerContext);
    const [users, setUsers] = useState<TTeamUser[]>([]);

    const [isScoreVisible, setIsScoreVisible] = useState(false);

    const pressTab = () => {
        setIsScoreVisible(!isScoreVisible);
    }

    useKeyHandler(9, pressTab)

    //Прилетает массив игроков:

    //Игрок Статус Счёт Смертей
    //REFLX   Умер   10       0



    const updateScore = async () => {
        //const usersFromServer = await server.getUsers();
        //if (messagesFromServer) {
            //setMessages(messagesFromServer);
        //} //else {
            //if (server.error.code === 1002) {
                //console.log('nuku')
                //navigate("/login");
            //}
        //}
    };

    return(
        <>
        {
            isScoreVisible && (
                <div className="Back" onClick={() => {setIsScoreVisible(false)}}>
                        <h3>SCORE</h3>
                    <div className="firstTeam">
                        {users.map((user) => (
                            <p className="chat-message">
                                <span className="name">{user.name}:</span>
                                <span className="status">{user.status}</span>
                                <span className="score">{user.score}</span>
                                <span className="deaths">{user.deaths}</span>
                            </p>
                        ))}
                    </div>
                    <div className="secondTeam">
                        {users.map((user) => (
                            <p className="chat-message">
                                <span className="name">{user.name}:</span>
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