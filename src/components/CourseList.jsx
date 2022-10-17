import React from 'react';
import './../App.css';
import './Courselist.css'
const CourseList = ({id, info, selected, toggleSelected, invalid}) => {
  return (
    <div className="course card m-1 p-2" onClick={() => toggleSelected(id)}>
      <div className={`card-body  ${selected.includes(id) ? 'selected' : ''} ${invalid.includes(id) ? 'invalid' : ''}`}>
        <h5 className="card-title">{info.term} CS {info.number}:</h5>
        <p className="text-center">{info.title}</p>
        <div className="card-footer">
          <p className="text-center">{info.meets}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseList;