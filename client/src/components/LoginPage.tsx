import { useContext, useRef, useState } from 'react';
import { ServerContext } from '../App';
import { Link, Navigate } from 'react-router-dom';
import Bg from './Bg';


import '../Auth.css'

const LoginPage = () => {

    const server = useContext(ServerContext);
    const loginRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [loginSuccess, setLoginSuccess] = useState(false);


    const handleLogin = async () => {
        if(loginRef.current && passwordRef.current){
            const user = await server.login(loginRef.current.value, passwordRef.current.value);
            console.log(user);
            if (user){
              setLoginSuccess(true);
            }
        }
    };

    return (
    <div className="content">
        <h1>Вход</h1>
        <div className="input-form">
          <input
            type="text"
            id="username"
            name="username"
            className="input"
            placeholder="Логин"
            ref={loginRef}            
          />
          <input
            type="password"
            id="password"
            name="password"
            className="input"
            placeholder="Пароль"
            ref={passwordRef}
          />
         <button onClick={() => handleLogin()}>
            Войти
         </button>
        </div>
        {loginSuccess ? <Navigate to='/' replace={true}/> : null}
    </div>
    )
}; 

export default LoginPage;