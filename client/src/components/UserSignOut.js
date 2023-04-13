import React from "react";

import { Navigate } from "react-router-dom";

// Just a simple sign out component that redirects to the home page.
const UserSignOut = () => {
  return <Navigate to="/" />;
};

export default UserSignOut;
