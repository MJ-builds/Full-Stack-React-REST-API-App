import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCourseContext } from "../context/CourseContext";

const Courses = () => {
  const { courses, fetchCourses } = useCourseContext();

  /* Fetch courses when component mounts and when courses array changes, 
  using the fetchCourses function from the context. */
  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses();
    }
  }, [courses, fetchCourses]);

  return (
    <main>
      <div className="wrap main--grid">
        {courses.map((course) => (
          <NavLink
            key={course.id}
            className="course--module course--link"
            to={`/courses/${course.id}`}
          >
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </NavLink>
        ))}
        <NavLink
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </NavLink>
      </div>
    </main>
  );
};

export default Courses;
