import { useContext } from 'react';
import { StoreContext } from '../App';
import NavButton from "./navButton";
import "../Auth.css"

const NavBar = () => {
  const store = useContext(StoreContext);

  return (
    <header className="App-header">
      <button className='TEST'>Cyborg's</button>
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
