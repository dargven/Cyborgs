import { useContext } from 'react';
import { StoreContext } from '../App';
import { ServerContext } from "../App";
import NavButton from "./navButton";
import "../Auth.css"

const NavBar = () => {
  const store = useContext(StoreContext);
  const server = useContext(ServerContext);

  return (
    <header className="App-header">
      {store.isAuth() ?
      <>
        <NavButton to="/main" text="Играть" className="header-right"/>
        <button className="Leave" onClick={() => {
          server.logout();
          window.location.reload();
          }}>Выход</button>
      </> :
        <>
          <NavButton to="/registration" text="Регистрация" className="header-right"/>
          <NavButton to="/login" text="Войти" className="header-right"/>
        </>
      }
    </header >
  );
};

export default NavBar;
