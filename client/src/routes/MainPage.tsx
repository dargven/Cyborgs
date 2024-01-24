import { useContext, useEffect, useState } from "react";
import { ServerContext, StoreContext } from "../App";
import { useNavigate } from "react-router-dom";
import { TPlayerScore } from "../modules/Server/types";
import useKeyHandler from "../hooks/useKeyHandler";
import Loading from "../components/loading";
import useAuth from "../hooks/useAuth";
import "../Main.css";
import "./StaticPage.css"

const MainPage = () => {

    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const [isScorePressed, setIsScorePressed] = useState<boolean>(false);
    const [playerStats, setPlayerStats] = useState<TPlayerScore | null>(null)
    const navigate = useNavigate();

    const checkUser = () => {
        if (store.isAuth()) {
            navigate('/game');
        }
    }

    const updateScore = async () => {
        const statsFromServer = await server.getStats();
        if (statsFromServer) {
            setPlayerStats(statsFromServer)
        }
        else {
            if (server.error && server.error.code === 1002) {
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        if (isScorePressed) {
            updateScore();
        }
    }, [isScorePressed]);

    const {
        isLoading,
    } = useAuth()

    useKeyHandler(13, checkUser);

    return (
        <>
            {isLoading && <Loading />}
            <div className="slide-in">
            </div>

            <div className="b-marquee b-marquee--rtl">
                <div className="b-marquee__text">Петька спрашивает у Чапаева: «Василий Иванович, а что такое нюанс?»
                    Чапаев: — Снимай штаны Петька, покажу. Петька немного недоумевет, но снимает штаны. Чапаев подходит
                    сзади и засовывает ему понятно что, понятно куда, и объясняет: — Вот смотри Петька. Вроде и у тебя
                    х@й в жопе и у меня х@й в жопе… Но! Есть один нюанс…
                </div>
            </div>

            {isScorePressed && (
                <div className={`pageWrapper ${isScorePressed ? 'open' : ''}`}>
                    <div className="pageTitle">Статистика игрока</div>
                    <div className="container">

                        <div className="static">
                            <div>
                                игр
                                <div className="info">
                                    {playerStats?.games == null ? 0 : playerStats?.games}
                                </div>
                            </div>
                            <div>
                                победы
                                <div className="info">
                                    {playerStats?.victories == null ? 0 : playerStats?.victories}
                                </div>
                            </div>
                            <div>
                                поражения
                                <div className="info">{playerStats?.loses == null ? 0 : playerStats?.loses}</div>
                            </div>
                        </div>

                        <div className="user">
                            урон за все время
                            <div className="info-ace">
                                {playerStats?.allTimeDamage == null ? 0 : playerStats?.allTimeDamage}
                            </div>
                            убийств за все время

                            <div className="info">
                                {playerStats?.kills == null ? 0 : playerStats?.kills}
                            </div>
                            смертей
                            <div className="info">
                                {playerStats?.deaths == null ? 0 : playerStats?.deaths}
                            </div>

                            k/d
                            <div className="info">
                                {playerStats?.kills && playerStats?.deaths ? playerStats.kills / playerStats.deaths : 0}
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
            <h2>КИБОРГИ 2D</h2>
            <div className="Main">
                <button onClick={() => {
                    if (store.isAuth()) {
                        navigate('/game')
                    }
                    else
                        navigate('/login')
                }}>
                    Играть
                </button>
                <button onClick={() => setIsScorePressed(prevState => !prevState)}>
                    Статистика
                </button>

                <button className="Leave" onClick={() => {
                    server.logout();
                    navigate('/login', { replace: true });
                }}>Выход
                </button>
            </div>
        </>
    );
};

export default MainPage;

