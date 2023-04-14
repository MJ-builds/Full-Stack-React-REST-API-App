import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const PrivateRoute = () => {
  const { authenticatedUser } = useUserContext();
  const location = useLocation();
  /* If the user is authenticated, render the component that was passed in Route 
  within PrivateRoute(see App.js). If not, redirect to the sign in page. Once signed in,
  redirect to previous page/location */
  return authenticatedUser ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
