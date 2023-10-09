import React from 'react';

import { HOST } from './config';
import { Server } from './modules';

import Game from './components/Game/Game';

export const ServerContext = React.createContext<Server>(null!);

const App: React.FC = () => {
    const server = new Server(HOST);

    return (
        <ServerContext.Provider value={server}>
            <div style={{ width: '100vw', height: '100vh' }}>
                <Game />
            </div>
        </ServerContext.Provider>
    );
}

export default App;