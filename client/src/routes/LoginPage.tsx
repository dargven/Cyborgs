import { Navigate } from "react-router-dom";
import Loading from "../components/loading";
import NavButton from "../components/navButton";
import useEnterKeyHandler from "../hooks/useKeyHandler";
import useAuth from "../hooks/useAuth";
import useTab from "../hooks/useTab";

const openEyeIcon = process.env.PUBLIC_URL + "/assets/image/eye-open.png";
const closeEyeIcon = process.env.PUBLIC_URL + "/assets/image/eye-close.png";

const LoginPage = () => {
  const {
    loginRef,
    passwordRef,
    errorRef,
    loginSuccess,
    showPassword,
    isLoading,
    handleLogin,
    togglePasswordVisibility,
  } = useAuth();

  useEnterKeyHandler(13, handleLogin);
  useTab();

  return (
    <>
      {isLoading && <Loading />}
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
          </div>
          <div ref={errorRef} className="errorDiv"></div>
          <div className="PasswordRecovery">
            <NavButton
              to="/recovery"
              text="забыли пароль?"
              className="RecoveryButton"
            ></NavButton>
          </div>
          <button onClick={handleLogin}>
            <h1>Войти</h1>
          </button>
        </div>
        {loginSuccess ? <Navigate to="/main" replace={true} /> : null}
      </div>
    </>
  );
};

export default LoginPage;
