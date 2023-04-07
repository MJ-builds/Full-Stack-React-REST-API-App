import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// App Components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';

import { CourseProvider } from "./context/CourseContext";

//TODO: Add Routes and PrivateRoute components
function App() {
  return (
    <Router>
      <Header />
        <CourseProvider>
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path = "/signin" element = {<UserSignIn />} />
            <Route path = "/signup" element = {<UserSignUp />} />
            <Route path = "/courses/create" element = {<CreateCourse />} />
          </Routes>
        </CourseProvider>
    </Router>
  );
}

export default App;