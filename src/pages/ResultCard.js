import React, { useEffect, useMemo, useRef, useState } from 'react'
import {NavLink, useParams,Navigate} from 'react-router-dom'
import { useAuth } from '../hooks/userAuthContext'
import AnimateSpin from '../Components/AnimateSpin'
function ResultCard() {
  const firstLoad = useRef(true)
  const [isLoading,setIsLoading] = useState(true)
  const {isLoggedIn} = useAuth()
  const [results,setResults] = useState([])
  const params = useRef(useParams())

  useEffect(()=>{
      document.getElementById('res-card-filter').style.display = 'none'
      const constroller = new AbortController()
      const signal = constroller.signal
      if(results!=[]) fetchResults(signal)

      return ()=>{
        document.getElementById('res-card-filter').style.display = 'flex'
        console.log("res card cleanup")
        constroller.abort()
      }
  },[])

  const fetchResults = async (signal)=>{
    
    let baseURL = '/api/'
    if (params.current.branch===undefined) baseURL = '/api/resbyjob?jobid='+params.current.jobid
    else baseURL = '/api/resbybranch?branch='+params.current.branch+'&batch='+params.current.batch
    console.log(baseURL)
    fetch(baseURL,signal)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setResults(data.applications)
      setIsLoading(false)
    })
  }

  return (isLoggedIn===false)?<Navigate to={'/'}></Navigate>:(
    <div style={{height:'100%'}}>
        <div className='Contact result-table'>
        {isLoading?<AnimateSpin/>:
           results.length===0?<h2 style={{'backgroundColor':'white',
                                  'marginTop':'100px',height:'100px',
                                  display:'flex',alignItems:'center',
                                  justifyContent:'center',
                                  width:'300px',height:'80px',
                                  borderRadius:'20px',
                                  position:'relative',
                                  left:'50%',
                                  transform:'translate(-50%,0px)',                                  
                                  }}>No Hirings Yet</h2>: 
            <table>
                <thead>
                    <tr>
                    <th>Student</th>
                    <th>Company</th>
                    <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((elem,ind)=>{
                        return (
                            <tr key={params.current.branch===undefined?params.current.branch+ind: 'jobres'+ind}>
                                <td><NavLink to={'AllProfile/'+elem.roll_number}>{elem.student_name}</NavLink></td>
                                <td>{elem.company_name}</td>
                                <td><NavLink to={'apply/joblist/'+elem.jobid}>{elem.role}</NavLink></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        }
        </div>
    </div>
  )
}

export default ResultCard