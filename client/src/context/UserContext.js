import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const signIn = async (emailAddress, password) => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Basic ${btoa(`${emailAddress}:${password}`)}`,
        },
      });

      if (response.status === 200) {
        setAuthenticatedUser({
          ...response.data,
          emailAddress: emailAddress,
          password: password,
        });
      } else {
        setAuthenticatedUser(null);
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.error("Invalid user credentials");
      } else {
        console.error("An error occurred while signing in");
      }
    }
  };

  const signOut = () => {
    setAuthenticatedUser(null);
  };

  const value = {
    authenticatedUser,
    signIn,
    signOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
