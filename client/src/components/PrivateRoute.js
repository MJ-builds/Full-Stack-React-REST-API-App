import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const PrivateRoute = () => {
  const { authenticatedUser } = useUserContext();
/* TODO: Issue with New Course not going back after 
redirect to forbidden. UpdateCourse works fine */
  return authenticatedUser ? <Outlet /> : <Navigate to="/forbidden" />;
};

export default PrivateRoute;