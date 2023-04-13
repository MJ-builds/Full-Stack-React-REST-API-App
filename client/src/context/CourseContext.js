import { createContext, useState, useEffect, useContext } from "react";
import apiClient from "../apiClient";

const CourseContext = createContext();

export const useCourseContext = () => {
  return useContext(CourseContext);
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Fetch courses from API - ok for now but may need to adjust later
   when additional components added. Just wanted simple logic 
   working for now - 
   Update: changed course a little as the app unfolded. Will adjust in future */
  const fetchCourses = async (courseId) => {
    try {
      if (courseId) {
        const response = await apiClient.get(`/courses/${courseId}`);
        setCourses((prevCourses) => [...prevCourses, response.data]);
      } else {
        const response = await apiClient.get("/courses");
        setCourses(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  /* had an issue with the useEffect hook not updating the courses state, 
  so I created this function to refetch the courses */
  const refetchCourses = () => {
    setLoading(true);
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider
      value={{ courses, setCourses, fetchCourses, loading, refetchCourses }}
    >
      {children}
    </CourseContext.Provider>
  );
};
