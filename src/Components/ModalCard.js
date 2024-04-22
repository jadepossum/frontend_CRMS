import React,{useState} from 'react'
import ReactDOM from 'react-dom'
import JobDispCard from './JobDispCard'
const ModalCard = ({job,open,resetSelected}) => {
    const modalroot = document.querySelector('#portal-root');
    if(!open) modalroot.style.display = 'none';
    else modalroot.style.display = 'block';
    if(open)return ReactDOM.createPortal(
    <JobDispCard job = {open.Title!=undefined? open:job} onClose={resetSelected}></JobDispCard>
    ,document.querySelector("#portal-root")
  )
  return null
}

export default ModalCard