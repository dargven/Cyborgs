import { Link, NavLink } from "react-router-dom";
import NavButton from "./navButton";

const NavBar = () => {
    return (
        <header className="App-header">
            {/* <Link
                to="/registration"
                className="header-right"
            >
                Регистрация
            </Link>;

            <NavLink
                to="/login"
                className="header-right"
            >
                Войти
            </NavLink>; */}

            <NavButton to="/registration" text="Регистрация" className="header-right"/>
            <NavButton to="/login" text="Войти" className="header-right"/>
        </header>
    );
};

export default NavBar;
