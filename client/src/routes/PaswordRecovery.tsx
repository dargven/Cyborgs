import { useContext, useRef, useState } from "react";
import { ServerContext } from "../App";
import md5 from "md5-ts";
import NavBar from "../components/navBar";
import { Navigate } from "react-router-dom";
import "../Auth.css";

const PasswordRecovery = () => {
    const server = useContext(ServerContext);
    const loginRef = useRef <HTMLInputElement | null>(null);
    const codeRef = useRef <HTMLInputElement | null>(null);
    const newPasswordRef1 = useRef <HTMLInputElement | null>(null);
    const newPasswordRef2 = useRef <HTMLInputElement | null>(null);

    const [hideContent, setHideContent] = useState({
        recoveryPressed: false,
        codeConfirm: false,
    })

    const Recovery = async () => {
        if (loginRef.current) {
            const login = loginRef.current.value;
            const recovery = await server.resetPasswordByEmail( login );
            if (recovery) {
                setHideContent(prevState => ({
                    ...prevState,
                    recoveryPressed:true,
                }))
            }
        }
    };

    const SetCode = async () => {
        if (codeRef.current) {
            const code = codeRef.current.value;
            const codeTrue = await server.getCodeToResetPassword( code );
            if (codeTrue) {
                setHideContent(prevState => ({
                    ...prevState,
                    codeConfirm:true,
                }))
            }
        }
    }

    const sendNewHash = async () => {
        if(newPasswordRef1.current && newPasswordRef2.current && loginRef.current){
            const login = loginRef.current.value;
            const password1 = newPasswordRef1.current.value;
            const password2 = newPasswordRef2.current.value;
            if(password1 == password2){
                const hash = md5(login + password1);
                const passwordChanged = await server.setPasswordAfterReset( hash )
                if(passwordChanged)
                {
                    setHideContent(prevState => ({
                        ...prevState,
                        codeConfirm:false,
                        recoveryPressed:false}));
                }
            }
        }
    }

    return (
        <>
            <NavBar />
            <div className="title">
                КИБОРГИ <br /> ТЕПЕРЬ В 2D
            </div>
            <div className="content">
                <h1> Востановление пароля</h1>
                <div className="input-form">
                    <input
                        type="text"
                        id="login"
                        name="login"
                        className="input"
                        placeholder="Логин"
                        ref={loginRef}
                    />
                    <button
                        className="PaswordRecovery"
                        onClick={() => Recovery()}
                    >
                        Востановить пароль
                    </button>
                
                {hideContent.recoveryPressed &&
                    <>
                        <input
                            type="text"
                            id="recoveryCode"
                            name="recoveryCode"
                            className="recoveryCode"
                            placeholder="Код"
                            ref={codeRef}
                        />
                        <button 
                            className="RecoveryButton"
                            onClick={() => SetCode()}
                        >
                            Отправить код
                        </button>
                    </>
                }
                {hideContent.codeConfirm &&
                    <>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="password"
                            placeholder="Новый пароль"
                            ref={newPasswordRef1}
                        />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="password"
                            placeholder="Повторите пароль"
                            ref={newPasswordRef2}
                        />
                        <button
                            className="RecoveryButton2" 
                            onClick={() => sendNewHash()}
                        >
                            Изменить пароль
                        </button>
                    </>
                }</div>
            </div>
        </>
    );
};

export default PasswordRecovery;