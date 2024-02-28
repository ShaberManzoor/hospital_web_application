import React, { useContext } from 'react'
import { authContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children, allowedRoles}) => {
    const {token, role} = useContext(authContext);
    const isAllowed = allowedRoles.includes(role);
    const accesibleRoute = token && isAllowed ? children : <Navigate to={'/sign-in'} replace={true} />;
  return accesibleRoute;
}

export default ProtectedRoute