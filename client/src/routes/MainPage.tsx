import {useContext} from "react";
import {ServerContext, StoreContext} from "../App";
import NavButton from "../components/navButton";
import "../Main.css";
import useKeyHandler from "../hooks/useKeyHandler";
import {Route, useNavigate} from "react-router-dom";
import LoginPage from "./LoginPage";

const MainPage = () => {

    const server = useContext(ServerContext);
    const store = useContext(StoreContext)
    const navigate = useNavigate();

    const checkUser = () => {

        if (store.isAuth()) {
            navigate('/game', {replace: true});
        } else {
            console.log("Пользователь не авторизован");
        }
    }

    useKeyHandler(13, checkUser);

    return (
        <>
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
                <NavButton to="/game" text="Играть"/>
                <button className="Leave" onClick={() => {
                    server.logout();
                    navigate('/login', {replace: true});
                    // window.location.reload();
                }}>Выход
                </button>
            </div>
        </>
    );
};

export default MainPage;

