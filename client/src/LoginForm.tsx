import React, { useState } from 'react';
import './Auth.css'


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    if (username === 'Admin' && password === '1111') { //Переделать
      setIsAuthenticated(true);
    }
  };

  return(
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
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-form">
          <input
            type="password"
            id="password"
            name="password"
            className="input"
            placeholder="Пароль"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

      {isAuthenticated && (
      <div>
        <h1>Вы успешно вошли!</h1>
      </div>
      
    )}
    </div>
)};

export default LoginForm;