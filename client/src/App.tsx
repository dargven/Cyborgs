import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HOST } from "./config";
import Server from "./modules/Server/Server";
import LoginPage from "./routes/LoginPage";
import MainPage from "./routes/MainPage";
import RegistrationPage from "./routes/RegistrationPage";
import PrivateRoute from "./components/privateRoute";
import GamePage from "./routes/GamePage";

export const ServerContext = React.createContext<Server>(new Server(HOST));

const App: React.FC = () => {
    const server = new Server(HOST);
    return (
        <BrowserRouter>
            <ServerContext.Provider value={server}>
                <Routes>
                    <Route path="" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/main" element={<MainPage />} />
                        <Route path="/game" element={<GamePage />} />
                    </Route>
                </Routes>
            </ServerContext.Provider>
        </BrowserRouter>
    );
};

export default App;
