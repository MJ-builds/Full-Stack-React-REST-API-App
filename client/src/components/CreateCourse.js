import React from 'react';


const CreateCourse = () => {

    //Just a simple placeholder while fleshing out the rest of the app
  const handleCancelClick = (event) => {
    event.preventDefault();
    window.location.href = '/';
  };

return (
<div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div>
                <form>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue="" />

                            <p>By Joe Smith</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription"></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue="" />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
);
};
export default CreateCourse;