import React, { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/userAuthContext'
function JobDispCard() {
    const {jobid} = useParams()
    const job = useMemo(()=>{
        let totjobs = JSON.parse(sessionStorage.getItem('posts'))
        console.log(totjobs)
        return totjobs.find(x =>x.id==jobid)
    },[jobid])
    const date = new Date();
    const deadline = new Date(job.Deadline);
    const applyClickHandler = (e)=>{
        console.log(job)
        console.log("isEligible :",job.isEligible)
        if(deadline<date){
            e.preventDefault();
            alert("Deadline has passed, Cannot Apply");
            return 
        }
        if(job.isEligible===false){
            e.preventDefault()
            alert("You are not Eligible, Cannot Apply");
        }
    }
   
    // return <div>hiiii</div>
  return  (job.id!==undefined)&&(
   <div  style={{height: '100%'}}>
            <Outlet/>
            <div className='Contact'>
                <div className='inner-container job-disp-card' style={{marginTop: "10px",textAlign:"left"}}>
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
                    <a className='ext-apply-link' 
                        href={job.ApplyLink} 
                        onClick={applyClickHandler}
                        style={{backgroundColor:(deadline<date||job.isEligible===false)?'rgb(221, 149, 149)':'rgb(147, 208, 147)'}} 
                        target='blank'>Visit to Apply</a>
                </div>
            </div>
        </div>
  )
}

export default JobDispCard