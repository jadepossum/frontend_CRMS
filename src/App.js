import React,{Component} from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout';
import JobListPage from './pages/JobListPage';
import ResultsListPage from './pages/ResultsListPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import JobCard from './pages/JobCard';
import ResultCard from './pages/ResultCard';
const router = createBrowserRouter([

  {
    path:'/',
    element:<Layout/>,
    children : [{
        path:'/',
        element:<JobListPage/>
      
      },
      {
        path:'jobpost/:jobid',
        element:<JobCard/>
      },
      {
        path :'result',
        element:<ResultsListPage/>,
        children:[]
      },
      {
        path:'result/:resultid',
        element:<ResultCard/>
      },
      {
        path :'profile',
        element:<ProfilePage/>
      },
      {
        path :'contact',
        element:<ContactPage/>
      },
      {
        path :'login',
        element:<LoginPage/>
      }
    ]
  }, 
])

class App extends Component{
  render(){
    return (
      <div className="App">
        <RouterProvider router={router}/>
      </div>
    );
  }
}

export default App;
