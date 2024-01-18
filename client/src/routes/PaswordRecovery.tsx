import useAuth from "../hooks/useAuth";
import Loading from "../components/loading";
import "../Auth.css";
import useTab from "../hooks/useTab";

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
        isLoading,
        sendNewHash,
        SetCode,
        Recovery,
    } = useAuth()

    useTab();

    return (
        <>
        {isLoading && <Loading/>}
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
                                tabIndex={0}
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
                                    tabIndex={0}
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
                                tabIndex={0}
                            />
                            <input
                                type="password"
                                id="password2"
                                name="password"
                                placeholder="Повторите пароль"
                                ref={newPasswordRef2}
                                tabIndex={0}
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
