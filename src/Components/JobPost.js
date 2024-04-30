import React from 'react'
import { NavLink } from 'react-router-dom'

function JobPost(props) {
  return (
    <NavLink to={'jobpost/'+props.jpost.id} className='job-post'>
        <h2>
        {props.jpost.Title}
        <br/>
        </h2>
        <h3>{props.jpost.Company}</h3>
        <div style={{
          width:"15px",
          height:"15px",
          borderRadius:"15px",
          backgroundColor:props.jpost.Status=="OPEN"?"green":"red"
        }}></div>
    </NavLink>
  )
}

export default JobPost