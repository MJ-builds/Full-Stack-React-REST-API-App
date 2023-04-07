import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css"; // Import the global styles
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import UserProvider from "./context/UserContext";
import {CourseProvider} from "./context/CourseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <CourseProvider>
        <App />
      </CourseProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
