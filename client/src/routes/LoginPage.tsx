import {Navigate} from "react-router-dom";
import NavBar from "../components/navBar";
import NavButton from "../components/navButton";
import useEnterKeyHandler from "../hooks/useKeyHandler";
import getError from "../hooks/getError";
import ScoreMenu from "../components/ScoreMenu/ScoreMenu";
import useAuth from "../hooks/useAuth";

const openEyeIcon = process.env.PUBLIC_URL + "/assets/image/eye-open.png";
const closeEyeIcon = process.env.PUBLIC_URL + "/assets/image/eye-close.png";

const LoginPage = () => {
    const {
        loginRef,
        passwordRef,
        errorRef,
        loginSuccess,
        showPassword,
        handleLogin,
        togglePasswordVisibility,
      } = useAuth();

    useEnterKeyHandler(13, handleLogin);

    return (


        <ScoreMenu/>
        
        // <>
        //     <NavBar/>
        //     <div className="title">
        //         КИБОРГИ <br/> ТЕПЕРЬ В 2D
        //     </div>
        //     <div className="content">
        //         <h1>Вход</h1>
        //         <div className="input-form">
        //             <input
        //                 type="text"
        //                 id="login"
        //                 name="login"
        //                 className="input"
        //                 placeholder="Логин"
        //                 ref={loginRef}
        //             />
        //             <div className="password-input-container">
        //                 <input
        //                     type="password"
        //                     id="password"
        //                     name="password"
        //                     className="input"
        //                     placeholder="Пароль"
        //                     ref={passwordRef}
        //                 />
        //                 <button
        //                     className="show-password-button"
        //                     onClick={togglePasswordVisibility}
        //                 >
        //                     <img
        //                         src={showPassword ? openEyeIcon : closeEyeIcon}
        //                         className="eyeIcon"
        //                     />
        //                 </button>
        //             </div>
        //             <div ref={errorRef} className="errorDiv"></div>
        //             <div className="PasswordRecovery">
        //                 <NavButton
        //                     to="/PaswordRecovery"
        //                     text="забыли пароль?"
        //                     className="RecoveryButton"
        //                 ></NavButton>
        //             </div>
        //             <button onClick={() => handleLogin()}>
        //                 <h1>Войти</h1>
        //             </button>
        //         </div>

        //         {loginSuccess ? <Navigate to="/main" replace={true}/> : null}
        //     </div>
        // </>
    );
};

export default LoginPage;
