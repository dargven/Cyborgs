import { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { StoreContext } from '../App';

const PrivateRoute = () => {
    const store = useContext(StoreContext);

    return (
        store.isAuth() ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;