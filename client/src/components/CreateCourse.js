import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../context/UserContext";

const CreateCourse = () => {
  const navigate = useNavigate();
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

    let errors = [];

    if (!courseTitle) {
      errors.push("Please provide a value for 'Titlexx'");
    }

    if (!courseDescription) {
      errors.push("Please provide a value for 'Description'");
    }

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    if (authenticatedUser) {
      const { emailAddress, password, id: userId } = authenticatedUser;

      try {
        const response = await axios.post(
          "http://localhost:5000/api/courses",
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
          navigate('/');
        } else {
          console.error("An error occurred while creating the course");
        }
      } catch (error) {
        console.error("An error occurred while creating the course", error);
      }
    } else {
      console.error("User is not authenticated");
    }
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      {errors.length > 0 && (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
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
                By {authenticatedUser.firstName} {authenticatedUser.lastName}
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
