import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext } from "../App";
import { Navigate } from "react-router-dom";
import md5 from "md5-ts";
import NavBar from "../components/navBar";
import NavButton from "../components/navButton";
import useEnterKeyHandler from "../hooks/useKeyHandler";
import { Ref } from "react";

const openEyeIcon = process.env.PUBLIC_URL + "/assets/image/eye-open.png";
const closeEyeIcon = process.env.PUBLIC_URL + "/assets/image/eye-close.png";

const LoginPage = () => {
    const server = useContext(ServerContext);
    const loginRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const errorRef = useRef<HTMLDivElement | null>(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (loginRef.current && passwordRef.current) {
            const login = loginRef.current.value;
            const rnd = Math.round(283 * Math.random());
            const hash = md5(md5(login + passwordRef.current.value) + rnd);
            const user = await server.login(login, hash, rnd);
            if (user) {
                setLoginSuccess(true);
            } else {
                errorRef.current!.innerHTML = `${server.error.text}`;
                console.log();
            }
        }
    };

    useEnterKeyHandler(13, handleLogin);

    const togglePasswordVisibility = () => {
        if (passwordRef.current) {
            passwordRef.current.type = showPassword ? "password" : "text";
            setShowPassword(!showPassword);
        }
    };

    return (
        <>
            <NavBar />
            <div className="title">
                КИБОРГИ <br /> ТЕПЕРЬ В 2D
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
                    <div className="password-input-container">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="input"
                            placeholder="Пароль"
                            ref={passwordRef}
                        />
                        <button
                            className="show-password-button"
                            onClick={togglePasswordVisibility}
                        >
                            <img
                                src={showPassword ? openEyeIcon : closeEyeIcon}
                                className="eyeIcon"
                            />
                        </button>
                    </div>
                    <div ref={errorRef} className="errorDiv"></div>
                    <div className="PasswordRecovery">
                        <NavButton
                            to="/PaswordRecovery"
                            text="забыли пароль?"
                            className="RecoveryButton"
                        ></NavButton>
                    </div>
                    <button onClick={() => handleLogin()}>
                        <h1>Войти</h1>
                    </button>
                </div>

                {loginSuccess ? <Navigate to="/main" replace={true} /> : null}
            </div>
        </>
    );
};

export default LoginPage;
