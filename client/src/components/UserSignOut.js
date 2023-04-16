import React, { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const UserSignOut = () => {
  const { signOut } = useUserContext();

  /* Once the user clicks the link on Header and redirects to /signout, 
  the useEffect hook will call the signOut function and user will be signed out */
  useEffect(() => {
    signOut();
  }, [signOut]);

  return <Navigate to="/" />;
};

export default UserSignOut;
