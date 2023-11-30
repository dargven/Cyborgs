import {useContext} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {StoreContext} from '../App';

const PrivateRoute = () => {

    return (
        localStorage.getItem('token') ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;