import React, {  useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
function AllProfilesPage() {
  
  useEffect(()=>{
    console.count("all profiles useEffect in action")
  })
  return (
    <div className='page-container'>
            <Outlet/>
        <div className='Contact'>
           {['CSE','IT','EEE','ECE','ME'].map((brach,ind) => 
           <NavLink key={ind} to={'branch/'+2020+'/'+brach} className='card'>
             {brach}
           </NavLink>)}
        </div>
    </div>
  )
}

export default AllProfilesPage