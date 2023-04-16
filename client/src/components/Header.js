import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

/* Header component that displays the header of the app, and depending on whether a user 
is signed in or not, displays the appropriate navigation links 
(First Name Last Name / Sign Out or sign In / Sign Out). */
const Header = () => {
  const { authenticatedUser } = useUserContext();

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
                Welcome,{" "}
                <div className="logged--in--user">
                  {authenticatedUser.firstName} {authenticatedUser.lastName}
                </div>
                !
              </li>
              <li>
                <Link to="/signout">
                  Sign Out
                </Link>
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
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
