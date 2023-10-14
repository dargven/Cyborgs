import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Server from './modules/Server';
import { HOST } from './config';
import MainPage from './components/MainPage';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
//import {Page} from './Figma/Page'

export const ServerContext = React.createContext<Server>(new Server(HOST));

const App: React.FC = () => {
  const server = new Server(HOST);

  return (
    <BrowserRouter>
      <ServerContext.Provider value={server}>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </ServerContext.Provider>
    </BrowserRouter>
  );
};

export default App;