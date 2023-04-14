import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../apiClient";

import { useCourseContext } from "../context/CourseContext";
import { useUserContext } from "../context/UserContext";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { refetchCourses } = useCourseContext();
  const { authenticatedUser } = useUserContext();
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  const handleCancelClick = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if a user is authenticated, then attempt to create (POST) a new course, assuming no validation issues below
    if (authenticatedUser) {
      const { emailAddress, password, id: userId } = authenticatedUser;

      try {
        const response = await apiClient.post(
          "/courses",
          {
            userId,
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

        if (response.status === 201) {
          refetchCourses();
          navigate("/");
        } else {
          console.error("An error occurred while creating the course");
        }
        // for server errors - if there is a 500 error, navigate to the error page
      } catch (error) {
        if (error.response && error.response.status === 500) {
          navigate("/error");
        }
        // for validation errors - if there are any, setErrors to the array of errors from the API
        else if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const apiErrors = error.response.data.errors;
          setErrors(apiErrors);
        } else {
          console.error("User is not authenticated", error);
        }
      }
    }
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>
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
            <label className = "course--title-create--update" htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
            {authenticatedUser && (
              <>
                <p>
                <span className="course-author">By {authenticatedUser.firstName} {authenticatedUser.lastName}</span>
                </p>
              </>
            )}
            <label className = "course--title-create--update" htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className = "course--title-create--update" htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
            />

            <label className = "course--title-create--update" htmlFor="materialsNeeded">Materials Needed</label>
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
            Create Course
          </button>
          <button
            className="button button-secondary"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
