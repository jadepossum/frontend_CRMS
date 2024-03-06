import React from 'react'

function LoginPage() {
  return (
    <div className='page-container'>
        <div className='Login'>
          <input className='Uname' type='text' name='Username' placeholder='Enter Username'/><br/>
          <input className='Pword' type='password' name='Password' placeholder='Enter Password' autoComplete='current-password'/><br/>
          <input name="showpass" className="showpass" type="checkbox" 
            onClick={() => document.querySelector('.Pword').type = document.querySelector('.Pword').type == 'password' ? 'text' : 'password'}
            value="show password"/>
          <label htmlFor="showpass">Show Password</label>
          <input className='Login-btn' type='button' name='Login' value={'Login'}></input>
        </div>
    </div>
  )
}

export default LoginPage