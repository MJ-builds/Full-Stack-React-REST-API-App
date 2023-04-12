import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const PrivateRoute = () => {
  const { authenticatedUser } = useUserContext();

  return authenticatedUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;