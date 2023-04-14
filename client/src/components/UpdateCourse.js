import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../apiClient";

import { useUserContext } from "../context/UserContext";
import { useCourseContext } from "../context/CourseContext";

import NotFound from "./NotFound";
import Forbidden from "./Forbidden";

const UpdateCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { courses, refetchCourses } = useCourseContext();
  const { authenticatedUser } = useUserContext();

  const parsedCourseId = parseInt(courseId, 10);
  const course = courses.find((course) => course.id === parsedCourseId);

  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // set state for course fields below
  useEffect(() => {
    if (course) {
      setCourseTitle(course.title);
      setCourseDescription(course.description);
      setEstimatedTime(course.estimatedTime || "");
      setMaterialsNeeded(course.materialsNeeded || "");
      setShowUpdateForm(
        authenticatedUser && authenticatedUser.id === course.userId
      );
    }
    setLoading(false);
  }, [course]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!course) {
    return <NotFound />;
  }

  const handleCancelClick = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    /* Essentially if authenticatedUser && authenticatedUser.id === course.userId, 
    then try to update (PUT) the course based on the form changes to target fields */
    if (showUpdateForm) {
      const { emailAddress, password } = authenticatedUser;

      try {
        const response = await apiClient.put(
          `/courses/${courseId}`,
          {
            // userId,
            title: courseTitle,
            description: courseDescription,
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded,
          },
          {
            headers: {
              Authorization: `Basic ${btoa(`${emailAddress}:${password}`)}`,
            },
          }
        );

        if (response.status === 204) {
          refetchCourses();
          navigate(`/courses/${courseId}`);
        } else {
          console.error("An error occurred while updating the course");
        }
        // for server errors - if there is a 500 error, navigate to the error page
      } catch (error) {
        if (error.response && error.response.status === 500) {
          navigate("/error");
        } 
        //for validation errors - if there are any, setErrors to the array of errors from the API
        else if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const apiErrors = error.response.data.errors;
          setErrors(apiErrors);
        } else {
          console.error("An error occurred while updating the course", error);
        }
      }
    }
  };

  return (
    <div className="wrap">
      {/* if  authenticatedUser && authenticatedUser.id === course.userId, 
    then show the form and the user can edit - otherwise, render <Forbidden /> component */}
      {showUpdateForm ? (
        <React.Fragment>
          <h2>Update Course</h2>
          {errors.length > 0 && (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {/* map out errors in array, if any */}
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                />
                {authenticatedUser && (
                  <p>
                    By {course.user.firstName} {course.user.lastName}
                  </p>
                )}
                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  value={materialsNeeded}
                  onChange={(e) => setMaterialsNeeded(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div>
              <button className="button" type="submit">
                Update Course
              </button>
              <button
                className="button button-secondary"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </form>
        </React.Fragment>
      ) : (
        <Forbidden />
      )}
    </div>
  );
};

export default UpdateCourse;
