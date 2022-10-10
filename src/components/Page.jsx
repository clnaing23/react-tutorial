import React from 'react';
import './../App.css';
import CourseList from './CourseList';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Courselist.css'

const terms = {
  Fall: 'Fall', 
  Winter: 'Winter',
  Spring: 'Spring'
};

  const Selector = ({selection, setSelection}) => (
    <div className="btn-group">
      { 
        Object.keys(terms).map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
      }
    </div>
  );
  const TermButton = ({term, selection, setSelection}) => (
    <div>
      <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
        onChange={() => setSelection(term)} />
      <label className="btn btn-success mb-1 p-2" htmlFor={term}>
      { term }
      </label>
    </div>
  );
  
const Page = ({data}) => {
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  const [selected, setSelected] = useState([]);
  const toggleSelected = (item) => setSelected(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
  );


    return (
      <div>
        <Selector selection={selection} setSelection={setSelection} />
        <div className="courselist">
          {Object.entries(data.courses).filter(course => course[1].term === selection).map(([key, data]) => <CourseList id = {key} info={data} selected={selected} toggleSelected={toggleSelected} />)}      
        </div>  
      </div>
    );
  }
  
  
  
export default Page;
  