import React, { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, json, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/userAuthContext'
import AnimateSpin from './AnimateSpin'
function JobDispCard() {
    const {jobid} = useParams()
    const {profile} = useAuth()
    const [isLoading,setIsLoading] = useState(false)
    const [isApplied,setIsApplied] = useState(false)
    useEffect(()=>{
        console.log(profile.myApplications)
        console.log(isApplied)
        const myApplications = sessionStorage.getItem('myApplications')
        console.log("myApplications :",myApplications)
        if(myApplications!==null&&JSON.parse(myApplications).find(x=>x.job===job.id)!==undefined&&(isApplied===false)){
            setIsApplied(true)
            console.log("this job :",job.Title," is already applied")
        }
    })
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const job = useMemo(()=>{
        let totjobs = JSON.parse(sessionStorage.getItem('posts'))
        return totjobs.find(x =>x.id==jobid)
    },[jobid])
    

    const date = new Date();
    const deadline = new Date(job.Deadline);
    const applyClickHandler = async (e)=>{
        // console.log(job)
        // console.log("isEligible :",job.isEligible)
        // if(deadline<date){
        //     e.preventDefault();
        //     alert("Deadline has passed, Cannot Apply");
        // }
        // if(job.isEligible===false){
        //     e.preventDefault()
        //     alert("You are not Eligible, Cannot Apply");
        // }
        e.preventDefault()
        if(job.IsDirectApply){
            setIsLoading(true)
            console.log("direct apply")
            e.preventDefault()
            await fetch("/api/directapply",{
                method:"POST",
                headers:{'Content-Type' : 'application/json','X-CSRFToken':getCookie('csrftoken')},
                body:JSON.stringify({"job":job.id,"student":profile.studentDetails.roll_number})
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                setIsLoading(false)
                setIsApplied(data)
                const newapplications = sessionStorage.getItem('myApplications')?JSON.parse(sessionStorage.getItem('myApplications')):[]
                newapplications.push(data)
                sessionStorage.setItem('myApplications',JSON.stringify(newapplications))
            })
            .catch(err=>console.log(err))
        }
    }
   
    // return <div>hiiii</div>
  return  (job.id!==undefined)&&(
   <div  style={{height: '100%'}}>
            <Outlet/>
            {isLoading?<div className='Contact'><div className='load-spin-outer-container'><AnimateSpin/></div></div>:
            <div className='Contact'>
                <div className='inner-container' style={{display:"flex",marginTop:"10px",justifyContent:"space-between",gap:"10px"}}>
                    {job.IsDirectApply?
                        isApplied?
                            <div className='application-status ext-apply-link'>Applied</div>
                            :<a className='ext-apply-link' 
                                onClick={applyClickHandler}
                                style={{backgroundColor:(deadline<date||job.isEligible===false)?'rgb(221, 149, 149)':'rgb(147, 208, 147)'}} 
                                target='blank'>Apply
                            </a>
                        :<>
                            <a className='ext-apply-link' 
                            href={job.ApplyLink} 
                            style={{backgroundColor:(deadline<date||job.isEligible===false)?'rgb(221, 149, 149)':'rgb(147, 208, 147)'}} 
                            target='blank'>Visit to Apply
                            </a>
                            {isApplied?
                                <div className='application-status ext-apply-link'>Applied</div>
                                :<div className='ext-apply-link' onClick={applyClickHandler}
                                    style={{backgroundColor:(deadline<date||job.isEligible===false)?'rgb(221, 149, 149)':'rgb(147, 208, 147)'}} 
                                >Mark as Applied</div>
                            }
                        </>
                    }
                </div>
                <div className='inner-container job-disp-card' style={{textAlign:"left"}}>
                    <h2>{job.Title}</h2>
                    <p><strong>Status:</strong> <span>{deadline<date?"Closed":"Open"}</span></p>
                    <p><strong>Company:</strong> <span>{job.Company}</span></p>
                    <p><strong>Job Type:</strong> <span>{job.JobType}</span></p>
                    <p><strong>Salar y:</strong> <span>{job.Salary}</span></p>
                    <p><strong>Location:</strong><span> {job.Location}</span></p>
                    <p><strong>Description:</strong> <span>{job.Description}</span></p>
                    <p><strong>Prerequisites:</strong> <span>{job.Prerequisites}</span></p>
                    <p><strong>Required Skills:</strong> <span>{job.RequiredSkills}</span></p>
                    <p><strong>Experience Level:</strong> <span>{job.ExperienceLevel}</span></p>
                    {/* <p><strong>Posted Date:</strong> <span>{job.PostedDate}</span></p>
                    <p><strong>Deadline:</strong> <span>{job.Deadline}</span></p> */}
                </div>
                <div className='inner-container imp-dates'>
                    <h2>important Dates</h2>
                    
                    <table className='event-date-card'>
                        <thead>
                            <tr>
                                <th className='event-date-record-event' >Event</th>
                                <th className='event-date-record-date' style={{borderRadius:"20px"}} >Date</th>

                            </tr>
                        </thead>
                        <tbody style={{borderRadius:"20px"}}>
                        <tr className='event-date-record' key={"deadline12"}>
                            <td className='event-date-record-event'  >Deadline</td>
                            <td className='event-date-record-date'  >{job.Deadline}</td>
                        </tr>
                        <tr className='event-date-record' key={"posteddate12"}>
                            <td className='event-date-record-event'  >Posted Date</td>
                            <td className='event-date-record-date'  >{job.PostedDate}</td>
                        </tr>
                    {(typeof job.importantDates==="object" && job.importantDates!==null)?
                            job.importantDates.map((date, index) => 
                                <tr className='event-date-record' key={index}>
                                    <td className='event-date-record-event'  >{date.EventTitle}</td>
                                    <td className='event-date-record-date'  >{new Date(date.Date).toDateString()}</td>
                                    <td className='student-feedback-link' ><NavLink to={'discussionCorner/'+date.id}>Discuss</NavLink> </td>
                                </tr>
                            )
                    :null}
                        </tbody>
                    </table>
                </div>
            </div>
            }
        </div>
  )
}

export default JobDispCard