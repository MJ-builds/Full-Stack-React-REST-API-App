import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { useUserContext } from "../context/UserContext";
import { useCourseContext } from "../context/CourseContext";

const UpdateCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { courses, refetchCourses } = useCourseContext();
  const { authenticatedUser } = useUserContext();


  const parsedCourseId = parseInt(courseId, 10);
  const course = courses.find((course) => course.id === parsedCourseId);

  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    if (course) {
      setCourseTitle(course.title);
      setCourseDescription(course.description);
      setEstimatedTime(course.estimatedTime);
      setMaterialsNeeded(course.materialsNeeded);
      setLoading(false);
    }
},[course]);

if (loading) {
    return <p>Loading...</p>;
  }

  const handleCancelClick = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errors = [];

    if (!courseTitle) {
      errors.push("Please provide a value for 'Title'");
    }

    if (!courseDescription) {
      errors.push("Please provide a value for 'Description'");
    }

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    if (authenticatedUser) {
      const { emailAddress, password } = authenticatedUser;

      try {
        const response = await axios.put(
          `http://localhost:5000/api/courses/${courseId}`,
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
          console.error("An error occurred while creating the course");
        }
      } catch (error) {
        console.error("An error occurred while creating the course", error);
      }
    } else {
      console.error("User is not authenticated");
    }
  };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

  return (
    <div className="wrap">
      <h2>Update Course</h2>
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
    </div>
  );
};

export default UpdateCourse;
