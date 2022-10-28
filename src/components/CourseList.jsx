import React from 'react';
import './../App.css';
import './Courselist.css';
import { Link } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";


const CourseList = ({id, course, selected, toggleSelected, invalid, profile}) => {
  console.log(profile)
  return (
    <div className="course card m-1 p-2" onClick={() => toggleSelected(id)}>
      <div className={`card-body  ${selected.includes(id) ? 'selected' : ''} ${invalid.includes(id) ? 'invalid' : ''}`}>
        <h5 className="card-title">{course.term} CS {course.number}:</h5>
        <p className="text-center">{course.title}</p>
        {profile.isAdmin ? <Link to={`/courses/${id}`}><i className="bi bi-pencil-square"></i></Link> : null}
      </div>
      <div className="card-footer">
          <p className="text-center">{course.meets}</p>
      </div>
    </div>
  );
}

export default CourseList;