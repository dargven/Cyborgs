import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext } from "../App";
import md5 from "md5-ts";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";
import getError from "../hooks/getError";
import "../Auth.css";

const PasswordRecovery = () => {
    const server = useContext(ServerContext);
    const loginRef = useRef<HTMLInputElement | null>(null);
    const codeRef = useRef<HTMLInputElement | null>(null);
    const errorRef = useRef<HTMLDivElement | null>(null);
    const newPasswordRef1 = useRef<HTMLInputElement | null>(null);
    const newPasswordRef2 = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const [timer, setTimer] = useState(60);
    const [hideContent, setHideContent] = useState({
        recoveryPressed: false,
        codeConfirm: false,
        timeout: false,
        isButtonDisabled: false,
    });

    const startTimer = () => {
        setHideContent((prevState) => ({
            ...prevState,
            timeout: true,
            isButtonDisabled: true,
        }));

        let seconds = 60;

        const interval = setInterval(() => {
            setTimer(seconds);
            seconds--;

            if (seconds < 0) {
                clearInterval(interval);
                setHideContent((prevState) => ({
                    ...prevState,
                    timeout: false,
                    isButtonDisabled: false,
                }));
            }
        }, 1000);
    };

    const Recovery = async () => {
        if (loginRef.current) {
            const login = loginRef.current.value;
            localStorage.setItem("login", login);
            const recovery = await server.resetPasswordByEmail(login);
            if (recovery) {
                setHideContent((prevState) => ({
                    ...prevState,
                    recoveryPressed: true,
                }));
                startTimer();
            }
            errorRef.current!.innerText = getError(server.error);
        }
    };

    const SetCode = async () => {
        if (codeRef.current) {
            const code = codeRef.current.value;
            const codeTrue = await server.getCodeToResetPassword(code);
            if (codeTrue) {
                setHideContent((prevState) => ({
                    ...prevState,
                    codeConfirm: true,
                }));
            }
            errorRef.current!.innerText = getError(server.error);
        }
    };

    const sendNewHash = async () => {
        if (newPasswordRef1.current && newPasswordRef2.current) {
            const login = localStorage.getItem("login");
            const password1 = newPasswordRef1.current.value;
            const password2 = newPasswordRef2.current.value;
            if (password1 == password2) {
                const hash = md5(login + password1);
                localStorage.removeItem("login");
                const passwordChanged = await server.setPasswordAfterReset(
                    hash
                );
                if (passwordChanged) {
                    setHideContent((prevState) => ({
                        ...prevState,
                        codeConfirm: false,
                        recoveryPressed: false,
                    }));
                    navigate("/login");
                }
                errorRef.current!.innerText = getError(server.error);
            }
        }
    };

    useEffect(() => {
        setTimer(60);
    }, []);

    return (
        <>
            <NavBar />
            <div className="title">
                КИБОРГИ <br /> ТЕПЕРЬ В 2D
            </div>
            <div className="content">
                <h1> Восстановление пароля</h1>

                <div className="input-form">
                    {!hideContent.codeConfirm && (
                        <>
                            <input
                                type="text"
                                id="login"
                                name="login"
                                className="input"
                                placeholder="Логин"
                                ref={loginRef}
                                disabled={hideContent.recoveryPressed}
                            />
                            <div ref={errorRef} className="errorDiv"></div>
                            {hideContent.timeout && (
                                <div className="timeout">
                                    Времени до повторной отправки кода: {timer}{" "}
                                    с
                                </div>
                            )}
                            <button
                                className="PasswordRecovery"
                                onClick={() => Recovery()}
                                disabled={hideContent.isButtonDisabled}
                            >
                                Отправить код
                            </button>
                        </>
                    )}
                    {hideContent.recoveryPressed &&
                        !hideContent.codeConfirm && (
                            <>
                                <input
                                    type="text"
                                    id="recoveryCode"
                                    name="recoveryCode"
                                    className="recoveryCode"
                                    placeholder="Код"
                                    ref={codeRef}
                                />
                                <div ref={errorRef} className="errorDiv"></div>
                                <button
                                    className="RecoveryButton"
                                    onClick={() => SetCode()}
                                >
                                    Подтвердить
                                </button>
                            </>
                        )}
                    {hideContent.codeConfirm && (
                        <>
                            <input
                                type="password"
                                id="password1"
                                name="password"
                                className="password"
                                placeholder="Новый пароль"
                                ref={newPasswordRef1}
                            />
                            <input
                                type="password"
                                id="password2"
                                name="password"
                                className="password"
                                placeholder="Повторите пароль"
                                ref={newPasswordRef2}
                            />
                            <div ref={errorRef} className="errorDiv"></div>
                            <button
                                className="RecoveryButton"
                                onClick={() => sendNewHash()}
                            >
                                Изменить пароль
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default PasswordRecovery;
