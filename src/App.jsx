import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import Page from './components/Page';
import CourseList from './components/CourseList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';


const schedule2 = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "F101" : {
      "term": "Fall",
      "number": "101",
      "meets" : "MWF 11:00-11:50",
      "title" : "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110" : {
      "term": "Fall",
      "number": "110",
      "meets" : "MWF 10:00-10:50",
      "title" : "Intro Programming for non-majors"
    },
    "S313" : {
      "term": "Spring",
      "number": "313",
      "meets" : "TuTh 15:30-16:50",
      "title" : "Tangible Interaction Design and Learning"
    },
    "S314" : {
      "term": "Spring",
      "number": "314",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }
  }
};
const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php'
const fetchJson  = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw response;
  return response.json();
};

// export const useJsonQuery = (url) => {
//   const { data, isLoading, error } = useQuery([url], () => fetchJson(url));
//   return [ data, isLoading, error ];
// };
const Schedule = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  return (<div className="App">
  <header className="App-header">
    <Banner title={data.title} ></Banner>
    <div className='container'>
      <Page data={data}></Page>
    </div>
  </header>
</div>);
}
// console.log(Schedule())
const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='container'>
        <Schedule/>
      </div>
        
    </QueryClientProvider>
    );
};

export default App;
