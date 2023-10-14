import { useContext, useRef, useState } from 'react';
import { ServerContext } from '../App';
import { Link, Navigate } from 'react-router-dom';

import '../Auth.css';

const RegistrationPage = () => {
    const server = useContext(ServerContext);
    const loginRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null)

    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleRegistration = async () => {
        if (loginRef.current && emailRef.current && passwordRef.current) {
            const username = loginRef.current.value;
            const password = passwordRef.current.value;
            const email = emailRef.current.value;

            try {
                const response = await server.register(username, email, password);

                if (response) {
                    setRegistrationSuccess(true);
                } else {
                    console.error("Ошибка при регистрации:");
                }
            } catch (error) {
                console.error("Ошибка при отправке запроса:", error);
            }
        }
    };

    return (
        <div className="content">
            <h1>Регистрация</h1>
            <div className="input-form">
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="input"
                    placeholder="Логин"
                    ref={loginRef}
                />
                <input
                    type="text"
                    id="email"
                    name="email"
                    className="input"
                    placeholder="Почта"
                    ref={emailRef}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="input"
                    placeholder="Пароль"
                    ref={passwordRef}
                />
                <button onClick={() => handleRegistration()}>Зарегистрироваться</button>
            </div>
            {registrationSuccess ? <Navigate to='/main' replace={true} /> : null}
        </div>
    );
};

export default RegistrationPage;