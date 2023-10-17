import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import Server from './modules/Server';
import { HOST } from './config';
import RoutersH from './Hooks/useRoutes';
import NavBar from './components/navBar';

export const ServerContext = React.createContext<Server>(new Server(HOST));

const App: React.FC = () => {

  const server = new Server(HOST);
  return (
    <BrowserRouter>
      <ServerContext.Provider value={server}>
          <NavBar/>
          <RoutersH />
      </ServerContext.Provider>
    </BrowserRouter>
  );
};

export default App;