import {Navigate, useLocation} from "react-router-dom";
import { getToken } from "../hooks/useToken";

interface IprivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute = ({children}: IprivateRouteProps ) => {

    const location = useLocation();

    if(getToken() == null){
        return <Navigate to='/login'replace={true} state={{from: location}} />
    }

    return children;
}

export default PrivateRoute;
