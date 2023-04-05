import React, { Component } from 'react';

class App extends Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    this.fetchCourses();
  }

  /* Simple fetch for our Courses GET route from the Express server 
  - for testing purposes only to ensure CORS etc correctly setup*/

  async fetchCourses() {
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      const courses = await response.json();
      this.setState({ courses });
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  render() {
    const { courses } = this.state;
    return (
      <div className="App">
        <h1>Courses</h1>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
