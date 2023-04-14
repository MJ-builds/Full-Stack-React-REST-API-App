import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCourseContext } from "../context/CourseContext";

const Courses = () => {
  const { courses, fetchCourses } = useCourseContext();
  const navigate = useNavigate();
  /* Fetch courses when component mounts and when courses array changes, 
  using the fetchCourses function from the context.
  Addded: Had to modify fetchCourses to take in errors to 
  allow 500 to be flagged here - bit of a scuff job but works for now...
  TODO: refactor */
  useEffect(() => {
    if (courses.length === 0) {
      async function fetchData() {
        try {
          await fetchCourses();
        } catch (error) {
          console.error('Error fetching data:', error);
          if (error.response && error.response.status === 500) {
            navigate('/error');
          }
        }
      }
  
      fetchData();
    }
  }, [courses, fetchCourses, navigate]);
  

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
