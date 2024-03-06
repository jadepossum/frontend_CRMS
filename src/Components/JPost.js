import React from 'react';
import {NavLink} from 'react-router-dom';
const JPost = (props) => {
  return (
    <NavLink to={`/jobpost/${props.jpost.id}`} className='job'>
      <h3>
        {props.jpost.Title}
        <br/>
      </h3>
    </NavLink>
  )
}

export default JPost