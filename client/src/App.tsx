import React, {useEffect} from "react";
import { Navigate, Route, Routes} from "react-router-dom";
import {HOST} from "./config";
import {Store} from "./modules/Store/Store";
import Server from "./modules/Server/Server";
import LoginPage from "./routes/LoginPage";
import MainPage from "./routes/MainPage";
import RegistrationPage from "./routes/RegistrationPage";
import GamePage from "./routes/GamePage";
import PasswordRecovery from "./routes/PaswordRecovery";
import StartPage from "./routes/StartPage";
import PrivateRoute from "./components/privateRoute";

export const StoreContext = React.createContext<Store>(null!);
export const ServerContext = React.createContext<Server>(null!);

const App: React.FC = () => {
    const store = new Store();
    const server = new Server(HOST, store);

    const handleAutoLogin = async () => {
        if (localStorage.getItem('token')) {
            const isAutoLogin = await server.autoLogin()
            if (isAutoLogin) {
                store.setAuth()
            }
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            handleAutoLogin()
        }
    }, [])

    return (
        <StoreContext.Provider value={store}>
            <ServerContext.Provider value={server}>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />}/>
                    <Route path="recovery" element={<PasswordRecovery/>}/>
                    <Route path="start" element={<StartPage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="registration" element={<RegistrationPage/>}/>
                    <Route path="main" element={
                        <PrivateRoute>
                            <MainPage/>
                        </PrivateRoute>
                    }/>
                    <Route path="game" element={
                        <PrivateRoute>
                            <GamePage/>
                        </PrivateRoute>
                    }/>
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </ServerContext.Provider>
        </StoreContext.Provider>
    );
};

export default App;
