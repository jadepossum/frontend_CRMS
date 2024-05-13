import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import jpostimg from '../staticFiles/appbackground.jpg'
function JobPost(props) {
  const date = new Date();
  const deadline = new Date(props.jpost.Deadline);
  return (
    <NavLink to={'jobpost/'+props.jpost.id} className='job-post-card'>
        <h2 className='post-title'>{props.jpost.Title}</h2>
        <div className='deadline-container'>
          <h5 className='post-company' style={{marginBlock:"5px"}}>{props.jpost.Company}</h5>
          <h5 className='post-deadline'
          style={{backgroundColor:deadline<date?'rgb(221, 149, 149)':'rgb(147, 208, 147)'}}
          >{deadline.toDateString()}</h5>
        </div>
    </NavLink>
  )
}

export default JobPost