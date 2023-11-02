import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const auth = localStorage.getItem("token") ? true : false;

    return (
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;