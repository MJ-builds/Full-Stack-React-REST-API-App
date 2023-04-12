import React, {useState} from 'react';
import {useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const UserSignUp = () => {
  const navigate = useNavigate();  

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleCancelClick = (event) => {
    event.preventDefault();
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errors = [];

    if (!firstName) {
      errors.push("Please provide a value for 'First Name'");
    }

    if (!lastName) {
      errors.push("Please provide a value for 'Last Name'");
    }

    if (!emailAddress) {
      errors.push("Please provide a value for 'Email Address'");
    }

    if (!lastName) {
      errors.push("Please provide a value for 'Password'");
    }

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/users",
          {
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            password: password,
          },
        );

        if (response.status === 201) {
          navigate('/');
        } else {
          console.error("An error occurred while creating the course");
        }
      
      } catch (error) {
        console.error("An error occurred while creating the course", error);
      }
  };

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      {errors.length > 0 && (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input 
        id="firstName" 
        name="firstName" 
        type="text" 
        value={firstName} 
        onChange={(e) => setFirstName(e.target.value)}  
        />
        <label htmlFor="lastName">Last Name</label>
        <input 
        id="lastName" 
        name="lastName" 
        type="text" 
        value={lastName} 
        onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="emailAddress">Email Address</label>
        <input 
        id="emailAddress" 
        name="emailAddress" 
        type="email" 
        value={emailAddress} 
        onChange={(e) => setEmailAddress(e.target.value)}  
        />
        <label htmlFor="password">Password</label>
        <input 
        id="password" 
        name="password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}  
        />
        <button className="button" type="submit">
          Sign Up
        </button>
        <button className="button button-secondary" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
      <p>
        Already have a user account? Click here to{' '}
        <Link to="/signin  ">sign in</Link>!
      </p>
    </div>
  );
};

export default UserSignUp;
