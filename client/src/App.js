import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// App Components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignOut from "./components/UserSignOut";
import PrivateRoute from "./components/PrivateRoute";
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";
import UnhandledError from "./components/UnhandledError";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/courses/create" element={<PrivateRoute />}>
          <Route index element={<CreateCourse />} />
        </Route>
        <Route path="/courses/:courseId/update" element={<PrivateRoute />}>
          <Route index element={<UpdateCourse />} />
        </Route>
        <Route path= '/forbidden' element= {<Forbidden/>}/>
        <Route path= '/error' element = {<UnhandledError/>} />
        <Route path= '*' element= {<NotFound />}/>
      </Routes>
    </Router>
  );
}

export default App;
