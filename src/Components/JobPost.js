import React from 'react'

function JobPost(props) {
  return (
    <div className='job-post' onClick={() => props.setjob(props.jpost)}>
        <h3>
        {props.jpost.Title}
        <br/>
        </h3>
    </div>
  )
}

export default JobPost