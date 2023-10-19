import { useContext, useRef, useState } from "react";
import { ServerContext } from "../App";
import { Navigate } from "react-router-dom";
import "../Auth.css";

const RegistrationPage = () => {
  const server = useContext(ServerContext);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegistration = async () => {
    if (loginRef.current && passwordRef.current) {
      const login = loginRef.current.value;
      const password = passwordRef.current.value;

      try {
        const response = await server.register(login, password);

        if (response) {
          setRegistrationSuccess(true);
        } else {
          console.error("Ошибка при регистрации");
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
      }
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
        <h1>Регистрация</h1>
        <div className="input-form1">
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
          <button  onClick={() => handleRegistration()}>
            Зарегистрироваться
          </button>
        </div>
        {registrationSuccess ? <Navigate to="/main" replace={true} /> : null}
      </div>
    </>
  );
};

export default RegistrationPage;
