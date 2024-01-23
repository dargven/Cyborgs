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
import NavBar from "./components/navBar";
import { getToken } from "./hooks/useToken";

export const StoreContext = React.createContext<Store>(null!);
export const ServerContext = React.createContext<Server>(null!);

const App: React.FC = () => {
    const store = new Store();
    const server = new Server(HOST, store);
    const token = getToken()

    const handleAutoLogin = async () => {
        if (token !== null) {
            const isAutoLogin = await server.autoLogin()
            if (isAutoLogin) {
                store.setAuth()
            }else
            {
                sessionStorage.removeItem('token')
            }
        }
    }

    useEffect(() => {
        if (token) {
            handleAutoLogin()
        }
    }, [])

    return (
        <StoreContext.Provider value={store}>
            <ServerContext.Provider value={server}>
                <Routes>
                    <Route path="/" element={<NavBar/>}>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="registration" element={<RegistrationPage/>}/>
                        <Route path="recovery" element={<PasswordRecovery/>}/>
                        <Route path="*" element={store.isAuth() ? 
                            <Navigate to="/main" replace /> : 
                            <Navigate to="/main" replace />}
                        />
                        <Route path="/" element={store.isAuth() ? 
                            <Navigate to="/main" replace /> : 
                            <Navigate to="/main" replace />}
                        />
                    </Route>
                    <Route path="start" element={<StartPage/>}/>
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
                </Routes>
            </ServerContext.Provider>
        </StoreContext.Provider>
    );
};

export default App;
