import {useContext} from 'react';

import {ServerContext} from '../App';

import '../Auth.css'

const LoginForm = () => {
    const server = useContext(ServerContext);

    const handleLogin = async () => {
        const user = await server.login('Vasya', '1234');
        console.log(user);

    };

    return (
        <div className="Auth">
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>

            <div className="content">
                <h1>Вход</h1>
                <div className="input-form">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="input"
                        placeholder="Логин"
                    />
                </div>

                <div className="input-form">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="input"
                        placeholder="Пароль"
                    />
                </div>
                <div className="input-form">
                    <button type="submit" onClick={handleLogin}>
                        Войти
                    </button>
                </div>
                <a href="#" className="forget">
                    Забыли пароль?
                </a>
            </div>
        </div>
    )
};

export default LoginForm;