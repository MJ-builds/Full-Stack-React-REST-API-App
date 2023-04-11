import React, { useContext } from "react";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";


//TODO: PLENTY - Shell only. From markup.
const Header = () => {

  const { authenticatedUser, signOut } = useUserContext();

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
        {authenticatedUser ? (
          <ul className="header--signedin">
            <li>
              Welcome {authenticatedUser.firstName} {authenticatedUser.lastName}!
            </li>
            <li>
              <Link to="/signin" onClick={signOut}>Sign Out</Link>
            </li>
          </ul>
        ) : (
          <ul className="header--signedout">
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </ul>
          )
        }
        </nav>
      </div>
    </header>
  );
};

export default Header;
