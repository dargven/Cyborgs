import { useContext } from "react";
import { ServerContext } from "../App";
import NavButton from "../components/navButton";
import "../Main.css";

const MainPage = () => {

  const server = useContext(ServerContext);

  return (
    <>
      <div className="slide-in">
      </div>
      <div className="b-marquee b-marquee--rtl">
          <div className="b-marquee__text">Петька спрашивает у Чапаева: «Василий Иванович, а что такое нюанс?» Чапаев: — Снимай штаны Петька, покажу. Петька немного недоумевет, но снимает штаны. Чапаев подходит сзади и засовывает ему понятно что, понятно куда, и объясняет: — Вот смотри Петька. Вроде и у тебя х@й в жопе и у меня х@й в жопе… Но! Есть один нюанс…</div>
        </div>
      <h2>КИБОРГИ 2D</h2>
      <div className="Main">
        <NavButton to="/game" text="Играть"/>
        <button className="Leave" onClick={() => {
          server.logout();
          window.location.reload();
          }}>Выход</button>
      </div>
    </>
  );
};

export default MainPage;

