import { useContext } from 'react';

import { ServerContext } from '../App';

import '../Auth.css'

const RegistrationPage = () => {
    //const server = useContext(ServerContext);

    //const handleLogin = async () => {
        //const user = await server.login('Vasya', '1234');
        //console.log(user);
    //};

    return (
    <div className="Auth">
    <div className="bg"></div>
    <div className="bg bg2"></div>
    <div className="bg bg3"></div>

    <div className="content">
        <h1>Регистрация</h1>
    {[
    { type: 'text', id: 'username', name: 'username', placeholder: 'Логин' },
    { type: 'text', id: 'email', name: 'email', placeholder: 'Почта' },
    { type: 'password', id: 'password', name: 'password', placeholder: 'Пароль' },
    ].map((input, index) => (
        <div className="input-form" key={index}>
            <input type={input.type} id={input.id} name={input.name} className="input" placeholder={input.placeholder} />
        </div>
    ))}

    <div className="input-form">
        <button type="submit">Зарегестрироваться</button>
    </div>
 </div>
 
</div>
    )
};

export default RegistrationPage;