import React,{Component} from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout';
import JobListPage from './pages/JobListPage';
import JobDispCard from './Components/JobDispCard';
import ResultsListPage from './pages/ResultsListPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ResultCard from './pages/ResultCard';
import AllProfilesPage from './pages/AllProfilesPage';
import BranchProfileModal from './Modal/BranchProfileModal'
import ProfileDispCard from './Components/ProfileDispCard';
import FeedBackDispCard from './Components/FeedBackDispCard';
const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children : [{
        path:'/',
        element:<LoginPage/>
      
      },
      {
        path :'apply',
        element:<JobListPage/>,
        children:[
          {
            path:'jobpost/:jobid',
            element:<JobDispCard/>,
            children:[
              {
                path:'discussionCorner/:eventid',
                element:<FeedBackDispCard/>
              }
            ]
          }
        ]
      },
      {
        path :'result',
        element:<ResultsListPage/>,
        children:[
          {
            path:'getres/bybranch/:batch/:branch',
            element:<ResultCard/>
          },
          {
            path:'getprofiles/bybranch/:batch/:branch',
            element:<BranchProfileModal/>,
            children:[{
              path:'student/:studentid',
              element:<ProfileDispCard/>
            }  
            ]
          },
        ]
      },
      {
        path :'result/bybranch/:batch/:branch',
        element:<ResultCard/>
      },
      {
        path :'result/byjobpost/:jobid',
        element :<ResultCard/>
      },
      {
        path :'allprofiles',
        element:<AllProfilesPage/>,
        children:[
          {
            path :'branch/:batch/:branch',
            element:<BranchProfileModal/>,
            children:[{
              path:'student/:studentid',
              element:<div className='Contact'>hii there</div>
            }  
            ]
          }
          ,
        ]
      }
      ,
      
      {
        path :'profile',
        element:<ProfilePage/>
      },
      {
        path :'contact',
        element:<ContactPage/>
      },
      
      {
        path :'*',
        element: <h2 style={{position:'relative',top:'100px',left:'50%',
                            transform:'translate(-50%,0px)',width:"300px",
                            height:'80px',backgroundColor:'red',
                            display:'flex','alignItems':'center',
                            justifyContent:'center',
                            borderRadius:'20px',
                            }}>page not found</h2>
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
