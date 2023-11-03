import { useContext } from 'react';
import { StoreContext } from '../App';
import NavButton from "./navButton";

const NavBar = () => {
  const store = useContext(StoreContext);

  return (
    <header className="App-header">
      {store.isAuth() ?
        <button className="Leave" onClick={() => { }}>Выход</button> :
        <>
          <NavButton to="/main" text="Играть" />
          <NavButton to="/registration" text="Регистрация" />
          <NavButton to="/login" text="Войти" />
        </>
      }
    </header >
  );
};

export default NavBar;
