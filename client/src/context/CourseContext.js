import { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  /* Fetch courses from API - ok for now but may need to adjust later
   when additional components added. Just wanted simple logic 
   working for now */
  const fetchCourses = async (courseId) => {
    try {
      if (courseId) {
        const response = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
        setCourses((prevCourses) => [...prevCourses, response.data]);
      } else {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  

  return (
    <CourseContext.Provider value={{ courses, setCourses, fetchCourses }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  return useContext(CourseContext);
};
