import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext } from "../App";
import { Navigate } from "react-router-dom";
import md5 from "md5-ts";
import useEnterKeyHandler from "../hooks/useKeyHandler";
import NavBar from "../components/navBar";
import getError from "../hooks/useError";
import { Ref } from "react";
import "../Auth.css";

const openEyeIcon = process.env.PUBLIC_URL + "/assets/image/eye-open.png";
const closeEyeIcon = process.env.PUBLIC_URL + "/assets/image/eye-close.png";
const RegistrationPage = () => {
    const server = useContext(ServerContext);
    const loginRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const errorRef = useRef<HTMLDivElement | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleRegistration = async () => {
        if (
            loginRef.current &&
            passwordRef.current &&
            nameRef.current &&
            emailRef.current
        ) {
            const login = loginRef.current.value;
            const hash = md5(login + passwordRef.current.value);
            const name = nameRef.current.value;
            const email = emailRef.current.value;
            const response = await server.register(login, hash, name, email);
            if (response) {
                setRegistrationSuccess(true);
            } else {
                errorRef.current!.innerText = `${getError(server.error)}`;
            }
        }
    };

    useEnterKeyHandler(13, handleRegistration);

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
                <h1>Регистрация</h1>
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
                        type="text"
                        id="name"
                        name="name"
                        className="input"
                        placeholder="Имя"
                        ref={nameRef}
                    />
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="input"
                        placeholder="Почта"
                        ref={emailRef}
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
                        <div ref={errorRef} className="errorDiv"></div>
                    </div>
                    <button onClick={() => handleRegistration()}>
                        <h1>Зарегистрироваться</h1>
                    </button>
                </div>
                {registrationSuccess ? (
                    <Navigate to="/login" replace={true} />
                ) : null}
            </div>
        </>
    );
};

export default RegistrationPage;
