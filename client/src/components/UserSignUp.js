import React from 'react';
import {useNavigate} from 'react-router-dom';

//TODO: PLENTY - Shell only. From markup.
const UserSignUp = () => {
  const navigate = useNavigate();  

  const handleCancelClick = (event) => {
    event.preventDefault();
    //Just a simple placeholder while fleshing out the rest of the app
    navigate('/');
  };

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      <form>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" defaultValue="" />
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" defaultValue="" />
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" defaultValue="" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" defaultValue="" />
        <button className="button" type="submit">
          Sign Up
        </button>
        <button className="button button-secondary" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
      <p>
        Already have a user account? Click here to{' '}
        <a href="/signin  ">sign in</a>!
      </p>
    </div>
  );
};

export default UserSignUp;
