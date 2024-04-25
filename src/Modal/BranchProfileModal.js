import React, { useState ,useRef, useEffect, useMemo} from 'react'
import ReactDOM from 'react-dom'
import {  useParams, NavLink, Outlet } from 'react-router-dom'
import AnimateSpin from '../Components/AnimateSpin'
function BranchProfileModal({branch,resetModal}) {
    const firstLoad = useRef(true)
    const closebtnRef = useRef()
    const [isLoading,setIsLoading] = useState(true)
    const [profiles,setProfiles] = useState([])
    const params  = useParams()

    useEffect(()=>{
        const controller = new AbortController()
        const signal = controller.signal
        console.count("branch profile modal useEffect in action")
        if(params.branch!==undefined){
            getProfiles(signal)
        }
        return ()=>{
            controller.abort()
            console.log("modal useEffect clanup")
        }
    },[])

    async function getProfiles(signal){
        console.log("first load fetch: ",firstLoad.current)
        console.log("isLoading :",isLoading)
        await fetch('/api/getbranchprofiles?branch='+params.branch +'&batch='+params.batch,signal)
        .then(res=>res.json())
        .then(data=>{
            console.log("data : ",data)
            setIsLoading(false)
            setProfiles(data)
        })
        console.log("fetch complete : ",firstLoad.current)
        console.log("isLoading : ",isLoading)
    }

    
    return (
        <div style={{height:'100%'}}>
            <Outlet/>
            <div className='Contact'>
                {isLoading?<AnimateSpin/>:
                <div className='page'>
                    {profiles?.studentDetails?.map((profile)=>
                        <NavLink key={profile.roll_number} className='job-post' to={'student/'+profile.roll_number}>
                            <div key={profile.roll_number}>{profile.name +" " + profile.roll_number}</div>
                        </NavLink>)}
                    <NavLink ref={closebtnRef} to={'/allprofiles'} >close</NavLink>
                </div>
                }
            </div>
        </div>
  )
}

export default BranchProfileModal