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
    console.log("selected job is :",job)
    // return <div>hiiii</div>
  return  (job.id!==undefined)&&(
   <div  style={{height: '100%'}}>
            <Outlet/>
            <div className='Contact'>
                <div className='inner-container' style={{marginTop: "10px"}}>
                    <h2>{job.Title}</h2>
                    <p><strong>Status:</strong> {job.Status}</p>
                    <p><strong>Company:</strong> {job.Company}</p>
                    <p><strong>Description:</strong> {job.Description}</p>
                    <p><strong>Prerequisites:</strong> {job.Prerequisites}</p>
                    <p><strong>Required Skills:</strong> {job.RequiredSkills}</p>
                    <p><strong>Salary:</strong> {job.Salary}</p>
                    <p><strong>Job Type:</strong> {job.JobType}</p>
                    <p><strong>Experience Level:</strong> {job.ExperienceLevel}</p>
                    <p><strong>Location:</strong> {job.Location}</p>

                </div>
                <div className='inner-container'>
                    <p><strong>Deadline:</strong> {job.Deadline}</p>
                    <p><strong>Posted Date:</strong> {job.PostedDate}</p>
                    <a className='ext-apply-link' href={job.ApplyLink}>Visit to Apply</a>
                    
                    {(typeof job.importantDates==="object" && job.importantDates!==null)?
                    <table className='event-date-card'>
                        <thead>
                            <tr>
                                <th className='event-date-record-event' style={{borderRadius:"20px"}}>Event</th>
                                <th className='event-date-record-date' style={{borderRadius:"20px"}} >Date</th>

                            </tr>
                        </thead>
                        <tbody style={{borderRadius:"20px"}}>
                            {job.importantDates.map((date, index) => 
                                <tr className='event-date-record' key={index}>
                                    <td className='event-date-record-event' style={{borderRadius:"20px"}} >{date.EventTitle}</td>
                                    <td className='event-date-record-date'style={{borderRadius:"20px"}} >{new Date(date.Date).toDateString()}</td>
                                    <td className='student-feedback-link'><NavLink to={'discussionCorner/'+date.id}>Discuss</NavLink> </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    :null}
                </div>
            </div>
        </div>
  )
}

export default JobDispCard