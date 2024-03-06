import React from 'react'
import {NavLink} from 'react-router-dom'
function ResultsListPage() {
  var filteroptions = document.querySelectorAll('.ResultFooter > li')
  filteroptions.forEach(elem=>{
      elem.addEventListener('click',()=>{
        if(elem.classList.contains("active-btn")){
          console.log(elem.innerHTML)        
        }
        else{
          filteroptions[0].classList.remove('active-btn')
          filteroptions[1].classList.remove('active-btn')
          elem.classList.add('active-btn')
        }
      })
  })

  return (
    <div className='page-container'>
        <div className='list'>
          <div className='page'>
            <NavLink to="1" className='result'>CSE</NavLink>
            <NavLink to="1" className='result'>IT</NavLink>
            <NavLink to="1" className='result'>EEE</NavLink>
            <NavLink to="1" className='result'>ECE</NavLink>
            <NavLink to="1" className='result'>MECH</NavLink>
            <div className='empty'></div>
          </div>
        </div>
        <div class=" ResultFooter footernav">
            <li onClick={console.log('filter applied')} className='active-btn'>by Branch</li>
            <li onClick={console.log('filter applied')}>by Company</li>
        </div>
    </div>
  )
}

export default ResultsListPage