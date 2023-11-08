import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HOST } from "./config";
import Server from "./modules/Server/Server";
import { Store } from "./modules/Store/Store";
import LoginPage from "./routes/LoginPage";
import MainPage from "./routes/MainPage";
import RegistrationPage from "./routes/RegistrationPage";
import PrivateRoute from "./components/privateRoute";
import GamePage from "./routes/GamePage";

export const StoreContext = React.createContext<Store>(null!);
export const ServerContext = React.createContext<Server>(null!);

const App: React.FC = () => {
    const store = new Store();
    const server = new Server(HOST, store);
    return (
        <BrowserRouter>
            <StoreContext.Provider value={store}>
                <ServerContext.Provider value={server}>
                    <Routes>
                        <Route path="" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/registration" element={<RegistrationPage />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/main" element={<MainPage />} />
                        </Route>
                        <Route path="/game" element={<GamePage />} />
                    </Routes>
                </ServerContext.Provider>
            </StoreContext.Provider>
        </BrowserRouter>
    );
};

export default App;
