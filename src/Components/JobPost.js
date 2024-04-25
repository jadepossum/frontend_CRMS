import React from 'react'
import { NavLink } from 'react-router-dom'

function JobPost(props) {
  return (
    <NavLink to={'jobpost/'+props.jpost.id} className='job-post'>
        <h3>
        {props.jpost.Title}
        <br/>
        </h3>
    </NavLink>
  )
}

export default JobPost