import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';

const ProtectedRoute = ({ children }) => {
    let{token} = useContext(userContext);
    if (token) {
        return children;
    } else {
        return <Navigate to='/login' />;
    }
};

export default ProtectedRoute;
