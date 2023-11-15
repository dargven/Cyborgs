import { useContext, useRef, useState } from "react";
import { ServerContext } from "../App";
import NavButton from "../components/navButton";
import "../Main.css";

const PasswordRecovery = () => {
    const server = useContext(ServerContext);
    const loginRef = useRef<HTMLInputElement | null>(null);
    return (
        <>
            <div className="title">
                КИБОРГИ <br /> ТЕПЕРЬ В 2D
            </div>
            <div className="content">
                <h1> востановление пароля</h1>
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
                        className="PaswordRecoveryButton"
                        onClick={() => {}}
                    >
                        Востановить пароль
                    </button>
                </div>
            </div>
        </>
    );
};

export default PasswordRecovery;
