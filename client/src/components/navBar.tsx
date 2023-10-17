import NavButton from "./navButton";

const NavBar = () => {
  return (
    <header className="App-header">
      <NavButton to="/user" text="Профиль" />

      <NavButton to="/registration" text="Регистрация" />

      <NavButton to="/login" text="Выйти" />

      <NavButton to="/login" text="Войти" />
    </header>
  );
};

export default NavBar;
