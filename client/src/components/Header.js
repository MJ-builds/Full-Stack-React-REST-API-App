import React, { useContext } from "react";

//TODO: PLENTY - Shell only. From markup.
const Header = () => {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <a href="/">Courses</a>
        </h1>
        <nav>
          <ul className="header--signedout">
            <li>
              <a href="/signup">Sign Up</a>
            </li>
            <li>
            {/* amend link name potentially */}
              <a href="/signin">Sign In</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
