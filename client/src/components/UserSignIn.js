import React from 'react';

//TODO: PLENTY - Shell only. From markup.
const UserSignIn = () => {
    
    //Just a simple placeholder while fleshing out the rest of the app
  const handleCancelClick = (event) => {
    event.preventDefault();
    window.location.href = '/';
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <form>
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" defaultValue="" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" defaultValue="" />
        <button className="button" type="submit">
          Sign In
        </button>
        <button className="button button-secondary" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
      <p>
        Don't have a user account? Click here to{' '}
        <a href="sign-up.html">sign up</a>!
      </p>
    </div>
  );
};

export default UserSignIn;
