import React from "react";

//if a route isn't matched the 'NotFound' component will be rendered.
const NotFound = () => {
  return (
    <div className="wrap">
      <h2>Not Found</h2>
      <p>Sorry! We couldn't find the page you're looking for.</p>
    </div>
  );
};

export default NotFound;
