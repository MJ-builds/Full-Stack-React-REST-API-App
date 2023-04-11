import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useCourseContext } from "../context/CourseContext";

const CourseDetail = () => {
  const { courseId } = useParams();
  const { courses, fetchCourses } = useCourseContext();
  const [loading, setLoading] = useState(true);

  /* I struggled with this for a while. I was getting an error that
courseId was undefined. I was passing in the courseId as a string, 
but the course.id was a number. I had to parse the courseId to a 
number to get it to work. Code from a prior TH project helped */
  const parsedCourseId = parseInt(courseId, 10);
  const course = courses.find((course) => course.id === parsedCourseId);

  useEffect(() => {
    if (!course) {
      fetchCourses(parsedCourseId).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [parsedCourseId, fetchCourses]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <React.Fragment>
      <div className="actions--bar">
        <div className="wrap">
        <NavLink className="button" to={`/courses/${course.id}/update`}>
            Update Course
          </NavLink>
          <NavLink className="button" to="#">
            Delete Course
          </NavLink>
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
              {course.description.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {/* Accounting for null values in the database for materialsNeeded */}
                {course.materialsNeeded
                  ? course.materialsNeeded
                      .split("\n")
                      .map((item, index) => <li key={index}>{item}</li>)
                  : null}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CourseDetail;
