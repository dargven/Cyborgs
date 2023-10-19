import React, {useEffect} from 'react';

import {HOST} from './config';
import {Server} from './modules';

import LoginForm from './components/LoginForm';

export const ServerContext = React.createContext<Server>(null!);

const App: React.FC = () => {
    const server = new Server(HOST);

    return (
        <ServerContext.Provider value={server}>
            <div>
                <LoginForm/>
            </div>
        </ServerContext.Provider>
    )
}

export default App;