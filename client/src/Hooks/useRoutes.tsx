import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../routes/LoginPage';
import MainPage from '../routes/MainPage';
import RegistrationPage from '../routes/RegistrationPage';
import NavBar from '../components/navBar';

const RoutersH: React.FC = () => {
    return (
          <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          </Routes>
    );
  };

  export default RoutersH;