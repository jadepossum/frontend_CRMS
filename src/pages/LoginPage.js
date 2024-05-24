import React,{useState,useEffect,useRef} from 'react'
import { useAuth } from '../hooks/userAuthContext'
import {Navigate} from 'react-router-dom'
import AnimateSpin from '../Components/AnimateSpin';
function LoginPage() {
  const [isLoading,setIsLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const checksecondload = useRef(true)
  const {setUser,isLoggedIn,setIsLoggedIn,setProfile,csrftoken,setCsrftoken} = useAuth()
  const usernameRef = useRef()
  const passwordRef = useRef()
  
  useEffect(()=>{
    console.count("login useEffect in action")
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

    const controller = new AbortController()
    const signal = controller.signal

    if(checksecondload.current){
      console.count("checking for login")
      setCsrftoken(getCookie('csrftoken'))
      if(!isLoggedIn){
        const token = sessionStorage.getItem("accesstoken")
        if(token){
          fetch('api/checklogin',{method : "POST", headers : {'Content-Type' : 'application/json','X-CSRFToken':csrftoken,}, body : JSON.stringify({"token" : token},signal)})
            .then(res=>res.json())
            .then(resdata=>{
              console.log("resdata : ",resdata)
              if(resdata.studentDetails.name!==undefined){
                console.log("logged in after checklogin")
                setUser(resdata.user)
                setProfile(resdata)
                console.log(resdata)
                sessionStorage.setItem('myApplications',JSON.stringify(resdata.myApplications))
                setIsLoggedIn(true)
                return true
              }
            })
            .catch(err=>console.log(err))
        }
      }else{
        console.count("user is already logged in")
      }
    }

    return ()=>{
      checksecondload.current = false
      controller.abort()
      console.count("request is cancelled")
    }
  },[])
  
  const userlogin = async () => {
    console.log("username:",usernameRef.current.value,"password:",passwordRef.current.value)
    if(usernameRef.current.value===""||passwordRef.current.value===""){
      setErrorMessage("Enter Login Credentials")
      setTimeout(()=>{
        setErrorMessage('')
      },3000)
      return null
    }
    setIsLoading(true)
    fetch('api/login',{
      method : 'POST',
      headers : {'Content-Type' : 'application/json',
      'X-CSRFToken':csrftoken,},
      body : JSON.stringify({
        "username" : usernameRef.current.value,
        "password" : passwordRef.current.value,
        
      })
    })
    .then(res=>res.json())
    .then(resdata=>{
      // if(resdata.details)
      if(resdata.err==undefined){
        sessionStorage.setItem("accesstoken",resdata.token);
        console.log("first login")
        setUser(resdata.user)
        setProfile(resdata)
        console.log(resdata)
        sessionStorage.setItem('myApplications',JSON.stringify(resdata.myApplications))
        setIsLoggedIn(true)
      }
      else{
        console.log(resdata.detail)
        setErrorMessage(resdata.detail)
      }
    }).catch(err=>{
      console.log(err)
      setErrorMessage(err);
    })
    .finally(()=>{
      setIsLoading(false);
    })
    setTimeout(()=>{
      setErrorMessage('')
    },4000)
    return null
  }
 
  return (
    (isLoggedIn===true)?<Navigate to="/apply"/>:
    
    <div className='page-container'>
      <div className='Contact' style={{backgroundColor:"transparent"}}>
          {(isLoading===true)?<div className='Login'>
            <AnimateSpin/>
          </div>:
          <div className='Login'>
              {(errorMessage=='')?null:<div className='login-error'>{errorMessage}</div>}
              <input className='Uname' ref={usernameRef} type='text' name='Username' placeholder='Enter Username'/><br/>
              <input className='Pword' ref={passwordRef} type='password' name='Password' placeholder='Enter Password' autoComplete='current-password'/><br/>
              <input name="showpass" className="showpass" type="checkbox" 
                onClick={() => document.querySelector('.Pword').type = document.querySelector('.Pword').type === 'password' ? 'text' : 'password'}
                value="show password"/>
              <label htmlFor="showpass" style={{"color":"black"}}>Show Password</label>
              <input className='Login-btn' onClick={userlogin} type='button' name='Login' value={'Login'}></input>
          </div>
          }
          </div>
    </div>
  )
}

export default LoginPage