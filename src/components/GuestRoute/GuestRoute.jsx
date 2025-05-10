import { useContext } from "react";
import { userContext } from '../../context/userContext';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    let {token} = useContext(userContext);
    if (token) {
        return <Navigate to="/" />;
       
    } else {
        return children;
    }
};

export default ProtectedRoute;
