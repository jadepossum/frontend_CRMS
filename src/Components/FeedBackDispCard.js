import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import AnimateSpin from './AnimateSpin'
import { useAuth } from '../hooks/userAuthContext'

function FeedBackDispCard() {
    const {eventid} = useParams()
    const feedbackRef = useRef()
    const TagRef = useRef()
    const {profile} = useAuth()
    const [seed,setSeed] = useState(0)
    const [isLoading,setIsLoading] = useState(true);
    const [comments,setComments] = useState([])

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

    const feedbackHandler = (e) => {
        e.preventDefault()
        console.count("eventid :"+eventid)
        console.log(profile.studentDetails)
        if(feedbackRef.current.value!==''){
        //   console.log({"feedBack":feedbackRef.current.value,"tag":TagRef.current.value,"event":eventid,
        // "rollNumber":profile.studentDetails.roll_number,"rating":5})
        console.count("posting suggestion")
         fetch("/api/writeFeedback",{
            method : 'POST',
            headers : {'Content-Type' : 'application/json',
            'X-CSRFToken':getCookie('csrftoken'),},
            body : JSON.stringify({
              "imp_date": eventid,
              "RollNumber" : profile.studentDetails.roll_number,
              "PhaseFeedback" : feedbackRef.current.value,
              // "tag" : TagRef.current.value,
            })
          }).then(res=>res.json())
          .then(data=>{
            setComments([])
            setSeed(prev=>prev==0?1:0)
            // fetchComments(9)
          })

        }
        console.log("feedback submitted")
    }

    useEffect(()=>{
      const controller = new AbortController()
      const signal = controller.signal
      console.log("eventid from useEffect :",eventid)
      if(comments!=[]) fetchComments(signal)
      return ()=>{
        controller.abort()
      }
    },[seed])

    const fetchComments = async(signal)=>{
      await fetch('/api/getFeedbacks?eventid='+eventid,signal)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        setComments(data.feedbacks)
        setIsLoading(false)
      })
    }

  return (
    <div style={{height:'100%'}}>
                      <div className='Contact'>
                            {isLoading?<div style={{width:"100%",height:"100%"}}>
                              <AnimateSpin/>
                            </div>:
                            <form className='profile-form' style={{display:'grid'}}>
                              <label>Enter FeedBack</label>
                              <span>:</span>
                              <textarea ref={feedbackRef} className='profile-input' />
                              <span></span>
                              <span></span>
                              <span></span>
                              <label>Choose Tag</label>
                              <span>:</span>
                              <select ref={TagRef} className='profile-input'>
                                <option>Dos</option>
                                <option>Don'ts</option>
                              </select>
                              <span></span>
                              <span></span>
                              <button className='profile-input' onClick={(e)=>{feedbackHandler(e)}}>send</button>
                            </form>
                            }
                           {comments==[]?<div>Feedback unavailable</div>
                              :<div className='page'>
                                {comments.map(elem=>{
                                  return <div className='inner-container student-feedback' >
                                    <span >{elem.student_name}</span>
                                    <p>{elem.feedback}</p>
                                  </div>
                                })}
                              </div>
                           }
                      </div>
                </div>
  )
}

export default FeedBackDispCard