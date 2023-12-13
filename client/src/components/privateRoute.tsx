import {Navigate, useLocation} from "react-router-dom";

interface IprivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute = ({children}: IprivateRouteProps ) => {

    const location = useLocation();

    const getToken = () => {
        return localStorage.getItem("token");
      };

    const token = getToken();

    if(!token){
        return <Navigate to='/login'replace={true} state={{from: location}} />
    }

    return children;
}

export default PrivateRoute;