import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext } from "../App";
import md5 from "md5-ts";
import getError from "./getError";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const server = useContext(ServerContext);
    const loginRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const errorRef = useRef<HTMLDivElement | null>(null);

    const newPasswordRef1 = useRef<HTMLInputElement | null>(null);
    const newPasswordRef2 = useRef<HTMLInputElement | null>(null);
    const codeRef = useRef<HTMLInputElement | null>(null);
  
    const navigate = useNavigate();
    const [timer, setTimer] = useState(60);

    const [useAuth, setUseAuth] = useState({
        loginSuccess: false,
        registrationSuccess: false,
        showPassword: false,
        recoveryPressed: false,
        codeConfirm: false,
        timeout: false,
        isButtonDisabled: false,

        isLoading: false
    })

    const handleLogin = async () => {
    if (loginRef.current?.value && passwordRef.current?.value) {
        const login = loginRef.current.value;
        const rnd = Math.round(283 * Math.random());
        const hash = md5(md5(login + passwordRef.current.value) + rnd);
        setUseAuth((prevState) => ({
            ...prevState,
            isLoading: true,
        }));

        const user = await server.login(login, hash, rnd);
        if (user) {
            setUseAuth((prevState) => ({
                ...prevState,
                loginSuccess: true,
                isLoading: false
            }));
        }

        setUseAuth((prevState) => ({
            ...prevState,
            isLoading: false,
        }));

        errorRef.current!.innerText = getError(server.error);
    }else{
        server.error.code=1001
        errorRef.current!.innerText=getError(server.error)
    }
    };


    const handleRegistration = async () => {
    if (
        loginRef.current?.value &&
        passwordRef.current?.value &&
        nameRef.current?.value &&
        emailRef.current?.value
    ) {
        const login = loginRef.current.value;
        const hash = md5(login + passwordRef.current.value);
        const name = nameRef.current.value;
        const email = emailRef.current.value;

        setUseAuth((prevState) => ({
            ...prevState,
            isLoading: true,
        }));

            const response = await server.register(login, hash, name, email);
            if (response) {
                setUseAuth((prevState) => ({
                    ...prevState,
                    registrationSuccess: true,
                }));
            } 
            setUseAuth((prevState) => ({
                ...prevState,
                isLoading: false,
            }));

            errorRef.current!.innerText = getError(server.error);
        } else {
        server.error.code=242
        errorRef.current!.innerText=getError(server.error)
    }
    };

    const togglePasswordVisibility = () => {
        if (passwordRef.current) {
            passwordRef.current.type = useAuth.showPassword ? "password" : "text";
            setUseAuth((prevState) => ({
                ...prevState,
                showPassword: !useAuth.showPassword,
            }));
        }
    };

    const startTimer = () => {
        setUseAuth((prevState) => ({
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
                setUseAuth((prevState) => ({
                    ...prevState,
                    timeout: false,
                    isButtonDisabled: false,
                }));
            }
        }, 1000);
    };

    const Recovery = async () => {
        if (loginRef.current?.value) {
            const login = loginRef.current.value;
            localStorage.setItem("login", login);
            setUseAuth((prevState) => ({
                ...prevState,
                isLoading: true,
            }));

            const recovery = await server.resetPasswordByEmail(login);
            if (recovery) {
                setUseAuth((prevState) => ({
                    ...prevState,
                    recoveryPressed: true,
                }));
                startTimer();
            }
            setUseAuth((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
            errorRef.current!.innerText = getError(server.error);
        }
        else{
            server.error.code=242
            errorRef.current!.innerText = getError(server.error);
        }
    };

    const SetCode = async () => {
        if (codeRef.current?.value) {
            const code = codeRef.current.value;
            setUseAuth((prevState) => ({
                ...prevState,
                isLoading: true,
            }));

            const codeTrue = await server.getCodeToResetPassword(code);
            if (codeTrue) {
                setUseAuth((prevState) => ({
                    ...prevState,
                    codeConfirm: true,
                }));
            }
            setUseAuth((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
            errorRef.current!.innerText = getError(server.error);
        }else{
            server.error.code=709
            errorRef.current!.innerText = getError(server.error);
        }
    };

    const sendNewHash = async () => {
        if (newPasswordRef1.current?.value && newPasswordRef2.current?.value) {
            const login = localStorage.getItem("login");
            const password1 = newPasswordRef1.current.value;
            const password2 = newPasswordRef2.current.value;
            setUseAuth((prevState) => ({
                ...prevState,
                isLoading: true,
            }));
            if (password1 === password2) {
                const hash = md5(login + password1);
                localStorage.removeItem("login");
                const passwordChanged = await server.setPasswordAfterReset(hash);
    
                if (passwordChanged) {
                    setUseAuth((prevState) => ({
                        ...prevState,
                        codeConfirm: false,
                        recoveryPressed: false,
                    }));
                    navigate("/login");
                }
    
                setUseAuth((prevState) => ({
                    ...prevState,
                    isLoading: false,
                }));
                errorRef.current!.innerText = getError(server.error);
            } else {
                newPasswordRef1.current.classList.add("error-input");
                newPasswordRef2.current.classList.add("error-input");
                errorRef.current!.innerText = "Вы ввели разные пароли";
                setTimeout(() => {
                    newPasswordRef1.current?.classList.remove("error-input");
                    newPasswordRef2.current?.classList.remove("error-input");
                    errorRef.current!.innerText = "";
                }, 5000);
                setUseAuth((prevState) => ({
                    ...prevState,
                    isLoading: false,
                }));
            }
        }else{
            server.error.code=242
            errorRef.current!.innerText = getError(server.error);
        }
    };
    

    useEffect(() => {
        setTimer(60);
    }, []);

    return {
        loginRef,
        passwordRef,
        emailRef,
        nameRef,
        errorRef,
        newPasswordRef1,
        newPasswordRef2,
        codeRef,
        timer,
        loginSuccess: useAuth.loginSuccess,
        registrationSuccess: useAuth.registrationSuccess,
        showPassword: useAuth.showPassword,
        recoveryPressed: useAuth.recoveryPressed,
        codeConfirm: useAuth.codeConfirm,
        timeout: useAuth.timeout,
        isButtonDisabled: useAuth.isButtonDisabled,
        isLoading: useAuth.isLoading,


        handleLogin,
        handleRegistration,
        togglePasswordVisibility,

        sendNewHash,
        SetCode,
        Recovery,

        };
    };

export default useAuth;