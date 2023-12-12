import NavBar from "../components/navBar";
import "../Auth.css";
import useAuth from "../hooks/useAuth";

const PasswordRecovery = () => {
    const {
        loginRef,
        codeRef,
        errorRef,
        newPasswordRef1,
        newPasswordRef2,
        codeConfirm,
        recoveryPressed,
        timeout,
        isButtonDisabled,
        timer,
        sendNewHash,
        SetCode,
        Recovery,
    } = useAuth()

    return (
        <>
            <NavBar/>
            <div className="title">
                КИБОРГИ <br/> ТЕПЕРЬ В 2D
            </div>
            <div className="content">
                <h1> Восстановление пароля</h1>

                <div className="input-form">
                    {!codeConfirm && (
                        <>
                            <input
                                type="text"
                                id="login"
                                name="login"
                                className="input"
                                placeholder="Логин"
                                ref={loginRef}
                                disabled={recoveryPressed}
                            />
                            <div ref={errorRef} className="errorDiv"></div>
                            {timeout && (
                                <div className="timeout">
                                    Времени до повторной отправки кода: {timer}{" "}
                                    с
                                </div>
                            )}
                            <button
                                className="PasswordRecovery"
                                onClick={() => Recovery()}
                                disabled={isButtonDisabled}
                            >
                                Отправить код
                            </button>
                        </>
                    )}
                    {recoveryPressed &&
                        !codeConfirm && (
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
                    {codeConfirm && (
                        <>
                            <input
                                type="password"
                                id="password1"
                                name="password"
                                placeholder="Новый пароль"
                                ref={newPasswordRef1}
                            />
                            <input
                                type="password"
                                id="password2"
                                name="password"
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
