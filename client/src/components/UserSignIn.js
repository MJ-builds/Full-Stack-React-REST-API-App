import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const UserSignIn = () => {
  const navigate = useNavigate();
  //for redirect to previous page after sign in
  const location = useLocation();
  const from = location.state?.from || "/";

  const { signIn, authenticatedUser } = useUserContext();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleEmailChange = (event) => {
    setEmailAddress(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const signInResult = await signIn(emailAddress, password);
      if (signInResult === true) {
        navigate(from);
      } else if (signInResult.status === 500) {
        navigate("/error");
      } else {
        setErrors(["Sign-in was unsuccessful"]);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const apiErrors = error.response.data.errors;
        setErrors(apiErrors);
      } else {
        console.error("Sign-in was unsuccessful", error);
      }
    }
  };
  

  const handleCancelClick = (event) => {
    event.preventDefault();
    navigate("/");
  };

  /* additional site logic to confirm that if the user is not signed in, 
  render the form, else render the "You are already signed in..." message.
  May amend this to simply navigating the user back to the home page automatically instead */
  if (!authenticatedUser) {
    return (
      <div className="form--centered">
        <h2>Sign In</h2>
        {errors.length > 0 && (
          <div className="validation--errors">
            <h3>Error:</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={emailAddress}
            onChange={handleEmailChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <button
            className="button button-secondary"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    );
  } else {
    return (
      // TODO: per above comment, may amend this to simply navigating the user back to the home page automatically instead
      <p className="wrap">You are already signed in...</p>
    );
  }
};

export default UserSignIn;
