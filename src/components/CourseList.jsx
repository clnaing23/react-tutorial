import React from 'react';
import './../App.css';
import './Courselist.css'
const CourseList = (props) => {
  return (
    <div className="card m-1 p-2">
      <div className="card-body">
        <h5 className="card-title">{props.info.term} CS {props.info.number}</h5>
        <p className="text-center">{props.info.title}</p>
      </div>
      <div className="card-footer">
        <p className="text-center">{props.info.meets}</p>
      </div>
    </div>
  );
}

export default CourseList;