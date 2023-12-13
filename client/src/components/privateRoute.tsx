import {Navigate, useLocation} from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute = ({children}: PrivateRouteProps ) => {

    const location = useLocation();

    const getToken = () => {
        return localStorage.getItem("token");
      };

    const token = getToken();

    if(!token){
        return <Navigate to='/login'replace={true} state={{from: location}} />
    }

    return children;

    // return (
    //     localStorage.getItem('token') ? <Outlet/> : <Navigate to="/login"/>
    // )
}

export default PrivateRoute;