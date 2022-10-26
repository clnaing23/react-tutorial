import { useFormData } from '../utilities/useFormData';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useDbData, useDbUpdate } from "../utilities/firebase";


const validateUserData = (key, val) => {
  switch (key) {
    case 'title':
      return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'meets':
      return /[M|Tu|W|Th|F]+ [0-9][0-9]:[0-9][0-9]-[0-9][0-9]:[0-9][0-9]/.test(val) ? '' : 'must contain a valid meeting date and time';
    default: return '';
  }
};

const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const CourseEdit = ({courses}) => {
  const { id } = useParams();
  const [update, result] = useDbUpdate(`/courses/${id}`);
  const [state, change] = useFormData(validateUserData, courses[id])
  const [data, error] = useDbData('/');

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
    const submit = (evt) => {
        evt.preventDefault();
        if (!state.errors) {
            console.log("Valid");
            update(state.values);
        }
    };
  console.log(courses[id])
  return (
    <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
      <InputField name="title" text="Title of Course" state={state} change={change} />
      <InputField name="meets" text="Time of Course" state={state} change={change} />
      <ButtonBar message={result?.message} />
    </form>
  )
};

export default CourseEdit;
