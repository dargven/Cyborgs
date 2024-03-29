import {Navigate} from "react-router-dom";
import useEnterKeyHandler from "../hooks/useKeyHandler";
import useAuth from "../hooks/useAuth";
import Loading from "../components/loading";
import "../Auth.css";
import useTab from "../hooks/useTab";

const openEyeIcon = process.env.PUBLIC_URL + "/assets/image/eye-open.png";
const closeEyeIcon = process.env.PUBLIC_URL + "/assets/image/eye-close.png";
const RegistrationPage = () => {

    const {
        loginRef,
        passwordRef,
        errorRef,
        emailRef,
        nameRef,
        registrationSuccess,
        showPassword,
        isLoading,
        handleRegistration,
        togglePasswordVisibility,
      } = useAuth();

    useEnterKeyHandler(13, handleRegistration);
    useTab();

    return (
        <>
            {isLoading && <Loading/>}
            <div className="title">
                КИБОРГИ <br/> ТЕПЕРЬ В 2D
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
                        tabIndex={0}
                    />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="input"
                        placeholder="Имя"
                        ref={nameRef}
                        tabIndex={0}
                    />
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="input"
                        placeholder="Почта"
                        ref={emailRef}
                        tabIndex={0}
                    />
                    <div className="password-input-container">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="input"
                            placeholder="Пароль"
                            ref={passwordRef}
                            tabIndex={0}
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
                    <Navigate to="/login" replace={true}/>
                ) : null}
            </div>
        </>
    );
};

export default RegistrationPage;
