import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const PrivateRoute = () => {
  const { authenticatedUser } = useUserContext();

  /* If the user is authenticated, render the component that was passed in Route 
  within PrivateRoute(see App.js). If not, redirect to the sign in page. */
  return authenticatedUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;