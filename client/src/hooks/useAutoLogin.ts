import { useEffect } from 'react';
import { Store } from '../modules/Store/Store';
import { Server } from '../modules';
import { HOST } from '../config';
import { getToken } from './useToken';


const useAutoLogin = () => {
    
    const store = new Store();
    const server = new Server(HOST, store);

  const handleAutoLogin = async () => {
    if (getToken() !== null && store.isAuth() == false) {
      const isAutoLogin = await server.autoLogin();
      if (isAutoLogin) {
        store.setAuth();
      } 
    }
  };

  useEffect(() => {
    if (getToken() !== null) {
      handleAutoLogin();
    }
  }, []);
}

export default useAutoLogin;