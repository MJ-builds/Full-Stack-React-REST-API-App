import React from 'react';
import {useNavigate} from 'react-router-dom';


const UpdateCourse = () => {
    const navigate = useNavigate();

    //Just a simple placeholder while fleshing out the rest of the app
  const handleCancelClick = (event) => {
    event.preventDefault();
    navigate('/');
  };

    return (
<div className="wrap">
                <h2>Update Course</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue="Build a Basic Bookcase"/>

                            <p>By Joe Smith</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" defaultValue="test"></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue="14 hours"/>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue="test"></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
)};

export default UpdateCourse;