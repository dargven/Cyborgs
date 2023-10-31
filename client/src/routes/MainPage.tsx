import { useContext, useRef, useState } from "react";
import { ServerContext } from "../App";
import { Navigate } from "react-router-dom";
import NavButton from "../components/navButton";
import "../Main.css";

const MainPage = () => {
  const handleMain = () => { };
  return (
    <>

      <div className="slide-in">
        
      </div>
      <div className="b-marquee b-marquee--rtl">
          <div className="b-marquee__text">Петька спрашивает у Чапаева: «Василий Иванович, а что такое нюанс?» Чапаев: — Снимай штаны Петька, покажу. Петька немного недоумевет, но снимает штаны. Чапаев подходит сзади и засовывает ему понятно что, понятно куда, и объясняет: — Вот смотри Петька. Вроде и у тебя х@й в жопе и у меня х@й в жопе… Но! Есть один нюанс…</div>
        </div>
      <h2>КИБОРГИ 2D</h2>
      <div className="Main">
        <NavButton to="/searchGame" text="Играть" />
        <NavButton to="/exit" text="Выход" />
      </div>
    </>
  );
};

export default MainPage;
