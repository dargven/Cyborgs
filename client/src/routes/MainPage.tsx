import { useContext, useRef, useState } from "react";
import { ServerContext } from "../App";
import { Navigate } from "react-router-dom";
import "../Auth.css";
import NavButton from "../components/navButton";

const MainPage = () => {
  const handleMain = () => {};
  return (
    <>
      <div className="titleMain">
        <p>КИБОРГИ 2D</p>
      </div>
      <div className="Main">
        <h1>Это основная страница</h1>
        <NavButton to="/server" text="список серверов" />
        <NavButton to="/searchGame" text="найти игру" />
        <NavButton to="/createGame" text="создать игру" />
        <NavButton to="/setting" text="настройки" />
        <NavButton to="/exit" text="выход" />
      </div>
    </>
  );
};

export default MainPage;
