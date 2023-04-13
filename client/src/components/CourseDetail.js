import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useCourseContext } from "../context/CourseContext";
import { useUserContext } from "../context/UserContext";
import ReactMarkdown from 'react-markdown'
import apiClient from '../apiClient';

import NotFound from "./NotFound";

const CourseDetail = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { courses } = useCourseContext();
  const { refetchCourses } = useCourseContext();
  const [loading, setLoading] = useState(true);
  const {authenticatedUser} = useUserContext();

  const parsedCourseId = parseInt(courseId, 10);
  const course = courses.find((course) => course.id === parsedCourseId);


  const deleteCourse = async () => {

  if (authenticatedUser && authenticatedUser.id === course.userId) {
    const { emailAddress, password } = authenticatedUser;

    try {
      const response = await apiClient.delete(
        `/courses/${courseId}`,
        {
          headers: {
            Authorization: `Basic ${btoa(`${emailAddress}:${password}`)}`,
          },
        }
      );

      if (response.status === 204) {
      } else {
        console.error("An error occurred while attempting to delete the course");
      }
    } catch (error) {
      console.error("An error occurred while attempting to delete the course", error);
    }
  } else {
    console.error("User is not authenticated");
  }
}

const handleDeleteCourse = async () => {
  if (window.confirm("Are you sure you want to delete this course?")) {
    // call the function to delete the course
    await deleteCourse();
    refetchCourses();
    navigate(`/`);
  }
};


  useEffect(() => {
    if (course) {
      setLoading(false);
    }
  }, [course]);

  if (!course) {
    return <NotFound />
  }

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <React.Fragment>
      <div className="actions--bar">
        <div className="wrap">
        {authenticatedUser && authenticatedUser.id === course.userId ? (
          <NavLink className="button" to={`/courses/${course.id}/update`}>
            Update Course
          </NavLink>
        ) : null}
        {authenticatedUser && authenticatedUser.id === course.userId ? (
          <NavLink className="button" onClick ={handleDeleteCourse}>
            Delete Course
          </NavLink>
          ) : null}
          <NavLink className="button button-secondary" to="/">
            Return to List
          </NavLink>
        </div>
      </div>
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {course.user.firstName} {course.user.lastName}</p>
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {/* may adjust for '\n' with a .map */}
                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CourseDetail;
