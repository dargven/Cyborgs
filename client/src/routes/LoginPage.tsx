import { useContext, useRef, useState } from "react";
import { ServerContext } from "../App";
import { Navigate } from "react-router-dom";
import "../Auth.css";

const LoginPage = () => {
  const server = useContext(ServerContext);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = async () => {
    if (loginRef.current && passwordRef.current) {
      const user = await server.login(
        loginRef.current.value,
        passwordRef.current.value
      );
      console.log(user);
      if (user) {
        setLoginSuccess(true);
      } else console.error("Ошибка авторизации");
    }
  };

  return (
    <>
      <div className="title">
        <p>
          КИБОРГИ <br /> ТЕПЕРЬ В 2D
        </p>
      </div>
      <div className="content">
        <h1>Вход</h1>
        <div className="input-form">
          <input
            type="text"
            id="login"
            name="login"
            className="input"
            placeholder="Логин"
            ref={loginRef}
          />
          <input
            type="password"
            id="password"
            name="password"
            className="input"
            placeholder="Пароль"
            ref={passwordRef}
          />

          <button onClick={() => handleLogin()}>Войти</button>
        </div>
        {loginSuccess ? <Navigate to="/main" replace={true} /> : null}
      </div>
    </>
  );
};

export default LoginPage;
