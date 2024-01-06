import {useContext} from "react";
import {ServerContext, StoreContext} from "../App";
import {useNavigate} from "react-router-dom";
import useKeyHandler from "../hooks/useKeyHandler";
import Loading from "../components/loading";
import "../Main.css";
import useAuth from "../hooks/useAuth";
import { getToken } from "../hooks/useToken";

const MainPage = () => {

    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const navigate = useNavigate();

    const checkUser = () => {
        if (store.isAuth()) {
            navigate('/game');
        }
    }



    const {
        isLoading,
    } = useAuth()

    useKeyHandler(13, checkUser);

    return (
        <>
            {isLoading && <Loading/>}
            <div className="slide-in">
            </div>
            <div className="b-marquee b-marquee--rtl">
                <div className="b-marquee__text">Петька спрашивает у Чапаева: «Василий Иванович, а что такое нюанс?»
                    Чапаев: — Снимай штаны Петька, покажу. Петька немного недоумевет, но снимает штаны. Чапаев подходит
                    сзади и засовывает ему понятно что, понятно куда, и объясняет: — Вот смотри Петька. Вроде и у тебя
                    х@й в жопе и у меня х@й в жопе… Но! Есть один нюанс…
                </div>
            </div>
            <h2>КИБОРГИ 2D</h2>
            <div className="Main">
                <button onClick={() => {
                    if(getToken() !== null)
                    {
                        navigate('/game')
                    }
                    else
                        navigate('/login')
                }}>
                    Играть
                </button>
                <button onClick={()=>{
                    navigate('/statistic',{replace:true})
                }}>Статистика</button>
                {/* <NavButton to="/game" text="Играть"/> */}
                <button className="Leave" onClick={() => {
                    server.logout()  ;
                    navigate('/login', {replace: true});
                }}>Выход
                </button>
            </div>
        </>
    );
};

export default MainPage;

