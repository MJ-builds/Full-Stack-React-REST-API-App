import React, {useState} from 'react';

import { useUserContext } from '../context/UserContext';

//TODO: PLENTY - Shell only. From markup.
const UserSignIn = () => {

    //adding authenticatedUser for testing. Will remove later
    const { signIn, authenticatedUser } = useUserContext();
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmailAddress(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        await signIn(emailAddress, password);
      };

    //Just a simple placeholder while fleshing out the rest of the app
  const handleCancelClick = (event) => {
    event.preventDefault();
    window.location.href = '/';
  };

  //testing authenticatedUser - to be removed later
  if (authenticatedUser) {
    console.log("User ID:", authenticatedUser.id);
    console.log("User First Name:", authenticatedUser.firstName);
    console.log("User Last Name:", authenticatedUser.lastName);
    console.log("User Email Address:", authenticatedUser.emailAddress);
  }

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
        Don't have a user account? Click here to{' '}
        <a href="/signup">sign up</a>!
      </p>
    </div>
  );
};

export default UserSignIn;
