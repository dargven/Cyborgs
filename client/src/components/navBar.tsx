import { Outlet } from "react-router-dom";
import NavButton from "./navButton";

const NavBar = () => {
    return (
        <>
            <header className="App-header">
                <NavButton to="/registration" text="Регистрация" className="header-right"/>
                <NavButton to="/login" text="Войти" className="header-right"/>
            </header>
            <Outlet/>
        </>


    );
};

export default NavBar;
