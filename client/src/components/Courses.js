import React, { useContext } from 'react';

const Courses = () => {
  return (
    <main>
            <div className="wrap main--grid">
                <a className="course--module course--link" href="course-detail.html">
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">Build a Basic Bookcase</h3>
                </a>
                <a className="course--module course--link" href="course-detail.html">
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">Learn How to Program</h3>
                </a>
                <a className="course--module course--link" href="course-detail.html">
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">Learn How to Test Programs</h3>
                </a>
                <a className="course--module course--add--module" href="create-course.html">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </a>
            </div>
        </main>
  );
};

export default Courses;

//FOR TESTING PURPOSES ONLY WHEN LINKING API TO CLIENT:
// class App extends Component {
//   state = {
//     courses: [],
//   };

//   componentDidMount() {
//     this.fetchCourses();
//   }

//   /* Simple fetch for our Courses GET route from the Express server 
//   - for testing purposes only to ensure CORS etc correctly setup*/

//   async fetchCourses() {
//     try {
//       const response = await fetch('http://localhost:5000/api/courses');
//       const courses = await response.json();
//       this.setState({ courses });
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   }

//   render() {
//     const { courses } = this.state;
//     return (
//       <div className="App">
//         <h1>Courses</h1>
//         <ul>
//           {courses.map((course) => (
//             <li key={course.id}>{course.title}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default App;
