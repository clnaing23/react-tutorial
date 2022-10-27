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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseEdit from './components/CourseEdit';
import Auth from './components/Auth';
import { useAuthState } from './utilities/firebase';


const Schedule = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [user] = useAuthState()
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  return (<div className="App">
  <header className="App-header">
    <nav>
      <Banner title={data.title} ></Banner>
      <Auth/>
    </nav>
    
    <div className='container'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page data={data}></Page>} />
        {user ? <Route path="/courses/:id" element={<CourseEdit courses={data.courses}/>} /> : null}
      </Routes>
    </BrowserRouter>
    </div>
  </header>
</div>);
}
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
