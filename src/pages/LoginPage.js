import React,{useState,useEffect} from 'react'
import { useAuth } from '../hooks/userAuthContext'
import {Navigate} from 'react-router-dom'
function LoginPage() {
  const {user,setUser,isLoggedIn,setIsLoggedIn,profile,setProfile,csrftoken,setCsrftoken} = useAuth();

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
  useEffect(()=>{
    setCsrftoken(getCookie('csrftoken'))
  })
  // const [csrftoken,setCsrftoken] = useState()


  const checkLoginStat =  async ()=>{
    console.log("inside checkLoginStat")
    const token = sessionStorage.getItem("accesstoken")
    console.log("token : ",token)
    if(token){
      fetch('api/checklogin',{method : "POST", headers : {'Content-Type' : 'application/json','X-CSRFToken':csrftoken,}, body : JSON.stringify({"token" : token})})
        .then(res=>res.json())
        .then(resdata=>{
          console.log("resdata : ",resdata)
          if(resdata.studentDetails.name!=undefined){
            console.log("logged in after checklogin")
            setUser(resdata.user)
            setProfile(resdata)
            console.log(resdata)
            setIsLoggedIn(true)
            return true
          }
        })
        .catch(err=>console.log(err))
    }
      return false;
  }
  const userlogin = async () => {
    fetch('api/login',{
      method : 'POST',
      headers : {'Content-Type' : 'application/json',
      'X-CSRFToken':csrftoken,},
      body : JSON.stringify({
        "username" : document.querySelector('.Uname').value,
        "password" : document.querySelector('.Pword').value,
        
      })
    })
    .then(res=>res.json())
    .then(resdata=>{
      if(resdata.studentDetails.name!=undefined){
        sessionStorage.setItem("accesstoken",resdata.token);
        console.log("first login")
        setUser(resdata.user)
        setProfile(resdata)
        console.log(resdata)
        setIsLoggedIn(true)
      }
    })
    return null
  }
 
  return (
    (isLoggedIn==true)?<Navigate to="/apply"/>:checkLoginStat()&&
    <div className='page-container'>
        <div className='Login'>
          <input className='Uname' type='text' name='Username' placeholder='Enter Username'/><br/>
          <input className='Pword' type='password' name='Password' placeholder='Enter Password' autoComplete='current-password'/><br/>
          <input name="showpass" className="showpass" type="checkbox" 
            onClick={() => document.querySelector('.Pword').type = document.querySelector('.Pword').type == 'password' ? 'text' : 'password'}
            value="show password"/>
          <label htmlFor="showpass">Show Password</label>
          <input className='Login-btn' onClick={userlogin} type='button' name='Login' value={'Login'}></input>
        </div>
    </div>
  )
}

export default LoginPage