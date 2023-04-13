import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import apiClient from "../apiClient";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(() => {
    //using JS Cookie to store the authenticated user in a cookie
    const storedUser = Cookies.get("authenticatedUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  /* sign in function - if the user is authenticated, set the authenticated user 
  in state and in a cookie for persistence. Accompanying auth header is also set. */
  const signIn = async (emailAddress, password) => {
    try {
      const response = await apiClient.get("/users", {
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
          // cookie expires in 1 day following creation
          { expires: 1 }
        );
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

  // sign out function - removes the authenticated user from state and the cookie
  const signOut = () => {
    setAuthenticatedUser(null);
    Cookies.remove("authenticatedUser");
  };

  return (
    <UserContext.Provider value={{ authenticatedUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
