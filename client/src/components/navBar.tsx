import NavButton from "./navButton";

const NavBar = () => {
  return (
    <header className="App-header">
      <NavButton to="/main" text="Main" />

      <NavButton to="/registration" text="Регистрация" />

      <NavButton to="/login" text="Войти" />
    </header>
  );
};

export default NavBar;
