import React from 'react';
import Server from './modules/server/Server';
import { HOST } from './config';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import MainPage from './components/MainPage';

export const ServerContext = React.createContext<Server>(null!);

const App: React.FC = () => {
  const server = new Server(HOST);

  return (
    <BrowserRouter>
      <ServerContext.Provider value={server}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path=""/>
        </Routes>
      </ServerContext.Provider>
    </BrowserRouter>
  );
};

export default App;