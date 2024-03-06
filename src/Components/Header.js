import React from 'react';
import {NavLink} from 'react-router-dom';
const Header = () => {
    return (
        <div className='header'>
            <img src='https://i0.wp.com/jntuwing.in/wp-content/uploads/2022/02/71B14E20-F721-4482-B367-C06C9CF82633.png?resize=205%2C192&ssl=1'/>
            <NavLink to='/'>Apply</NavLink>
            <NavLink to='/result'>Results</NavLink>
            <NavLink to='/contact'>Contact</NavLink>
            {/* <NavLink to='/about'>About</NavLink> */}
            <NavLink to='/profile'>Profile</NavLink>
            <NavLink to='/login'>Log in</NavLink>
        </div>
    )
}

export default Header