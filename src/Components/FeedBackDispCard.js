import React from 'react'
import { useParams } from 'react-router-dom'

function FeedBackDispCard() {
    const {eventid} = useParams()
  return (
    <div style={{height:'100%'}}>
                      <div className='Contact'>
                          <div className='page'>
                            <div className='job-post'>
                              Discussion Corner {eventid}
                            </div>
                          </div>
                      </div>
                </div>
  )
}

export default FeedBackDispCard