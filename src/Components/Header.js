import React from 'react';
import {NavLink} from 'react-router-dom';
import { useAuth } from '../hooks/userAuthContext';
import {Navigate} from 'react-router-dom'
const Header = () => {
    const {user,setUser,isLoggedIn,setIsLoggedIn,setProfile} = useAuth()
    return (
        <div className='header'>
            <img src='https://i0.wp.com/jntuwing.in/wp-content/uploads/2022/02/71B14E20-F721-4482-B367-C06C9CF82633.png?resize=205%2C192&ssl=1'/>
            <NavLink to='/apply'  id='apply.header'>Apply</NavLink>
            <NavLink to='/result'>Results</NavLink>
            <NavLink to='/contact'>Contact</NavLink>
            {/* <NavLink to='/about'>About</NavLink> */}
            <NavLink to='/profile' >Profile</NavLink>
            {(isLoggedIn==false)?<NavLink to='/' id='loginheader'>Log in</NavLink>: 
                <NavLink to='/logout' onClick={(e)=>{
                    e.preventDefault();
                    setIsLoggedIn(false);
                    sessionStorage.setItem("accesstoken","");
                    sessionStorage.removeItem("posts")
                    console.log("isloggedin :",isLoggedIn)
                    console.log("logout clicked");
                    setUser({});
                    setProfile({});
                    <Navigate to={'/login'} replace={true}></Navigate>
                }} >Log out</NavLink>
            }
        </div>
    )
}

export default Header