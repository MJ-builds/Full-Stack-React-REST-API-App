import React from "react";

//TO FIX outside of this component.
/* redirect users to the /error path when requests to the REST API
 return a "500 Internal Server Error" HTTP status code. */
const UnhandledError = () => {
  return (
    <div className="wrap">
      <h2>Error</h2>
      <p>Sorry! We just encountered an unexpected error.</p>
    </div>
  );
};

export default UnhandledError;
