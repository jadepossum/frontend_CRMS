import React, { useState } from 'react';
import { useParams ,Navigate} from 'react-router-dom';
import { useAuth } from '../hooks/userAuthContext';
const JobCard = () => {
    const {isLoggedIn} = useAuth()
    const {jobid} = useParams()
    const totjobs = JSON.parse(sessionStorage.getItem('posts'))
    const job = totjobs?totjobs.find(x =>x.id==jobid):null
    console.log(job)
    return (
        (!isLoggedIn)?<Navigate to='/'></Navigate>:
        (!job)?null:
        <div className='page-container'>
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
                    <a href={job.ApplyLink}>Apply Here</a>
                    
                    {(typeof job.importantDates==="object" && job.importantDates!==null)?
                    <table className='event-date-card'>
                        {/* <thead> */}
                            <tr>
                                <th className='event-date-record-event' style={{borderRadius:"20px"}}>Event</th>
                                <th className='event-date-record-date' style={{borderRadius:"20px"}} >Date</th>
                            </tr>
                        {/* </thead> */}
                        <tbody style={{borderRadius:"20px"}}>
                            {job.importantDates.map((date, index) => 
                                <tr className='event-date-record' key={index}>
                                    <td className='event-date-record-event' style={{borderRadius:"20px"}} >{date.EventTitle}</td>
                                    <td className='event-date-record-date'style={{borderRadius:"20px"}} >{new Date(date.Date).toDateString()}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    :null}

                </div>
            </div>
        </div>
    );
};

export default JobCard;
