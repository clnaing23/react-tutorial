import React from 'react';

const CourseList = (props) => {
  return (
    <p>{props.term} CS {props.number}: {props.title} </p>
  );
}

export default CourseList;