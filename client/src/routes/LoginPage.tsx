import {useContext, useRef, useState} from "react";
import {ServerContext} from "../App";
import {Navigate} from "react-router-dom";
import md5 from 'md5-ts';
import "../Auth.css";

const LoginPage = () => {
    const server = useContext(ServerContext);
    const loginRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleLogin = async () => {
        if (loginRef.current && passwordRef.current) {
            const login = loginRef.current.value;
            const rnd = Math.round(283 * Math.random());
            const password = md5(md5(loginRef.current.value + passwordRef.current.value) + rnd);
            const user = await server.login(
                login,
                password,
                rnd
            )
            if (user) {
                setLoginSuccess(true);
            } 
        }
    };

    return (
        <>
            <div className="title">
                <p>
                    КИБОРГИ <br/> ТЕПЕРЬ В 2D
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
                {loginSuccess ? <Navigate to="/main" replace={true}/> : null}
            </div>
        </>
    );
};

export default LoginPage;
