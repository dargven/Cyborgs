import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Server from './modules/server/Server';
import { HOST } from './config';
import MainPage from './components/MainPage';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';

export const ServerContext = React.createContext<Server>(new Server(HOST));

const App: React.FC = () => {
  const server = new Server(HOST);

  return (
    <BrowserRouter>
      <ServerContext.Provider value={server}>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path=""/>
        </Routes>
      </ServerContext.Provider>
    </BrowserRouter>
  );
};
export default App;