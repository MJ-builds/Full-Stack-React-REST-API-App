import React from "react";

/* if the requested course isn't owned by the authenticated user, 
redirect users to the /forbidden path */
const Forbidden = () => {
  return (
    <div className="wrap">
      <h2>Forbidden</h2>
      <p>Oh oh! You can't access this page.</p>
    </div>
  );
};

export default Forbidden;
