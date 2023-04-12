import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(() => {
    const storedUser = Cookies.get("authenticatedUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signIn = async (emailAddress, password) => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Basic ${btoa(`${emailAddress}:${password}`)}`,
        },
      });

      if (response.status === 200) {
        const authenticatedUserData = {
          ...response.data,
          emailAddress: emailAddress,
          password: password,
        };
        setAuthenticatedUser(authenticatedUserData);
        Cookies.set(
          "authenticatedUser",
          JSON.stringify(authenticatedUserData),
          { expires: 1 }
        ); // Set the cookie to expire in 1 day
        return true;
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
    Cookies.remove("authenticatedUser");
  };

  return <UserContext.Provider value={{authenticatedUser, signIn, signOut}}>{children}</UserContext.Provider>;
};

export default UserProvider;
