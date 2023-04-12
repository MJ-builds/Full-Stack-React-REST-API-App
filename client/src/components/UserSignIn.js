import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";


const UserSignIn = () => {
  
  const navigate = useNavigate();
  const { signIn } = useUserContext();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  
  const handleEmailChange = (event) => {
    setEmailAddress(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isSignedIn = await signIn(emailAddress, password);
    if (isSignedIn) {
      navigate("/");
    } else {
      console.log("Sign-in failed");
    }
  };


  const handleCancelClick = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
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
        <button className="button button-secondary" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
      <p>
        Don't have a user account? Click here to <Link to="/signup">sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
