import React, { useEffect, useState,useRef } from 'react';
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/userAuthContext';
function ResultsListPage() {
  const {profile} = useAuth()
  const secondload = useRef(false)
  const branchRef = useRef()
  const batchRef = useRef()
  const formActionRef = useRef()
  const navigator = useNavigate()
  const [currbatch] = useState(profile?.studentDetails?.batchYear)
  const [activeBtn, setActiveBtn] = useState(0);
  const [complist,setCompList] = useState([])
  useEffect(() => {
    console.log("respage useEffect in action")
    if(secondload.current===true){
      if(sessionStorage.getItem('rescomplist')===null){
        console.count('setting complist by fetch')
        getcompanylist()
      }
      else{
        console.count("setting complist from session storage")
        const sesscomplist = JSON.parse(sessionStorage.getItem('rescomplist'))
        setCompList(sesscomplist)
      }
    }
    return ()=>{
      secondload.current = true
      console.count("respage useEffect cleanup")
    }
  }, []);
  const getcompanylist = async ()=>{
    console.log("fetching results")
    await fetch('api/getcomplist')
    .then(res=>res.json())
    .then(data=>{
      let comp_list = [];
      data.company_list.map(elem=>{
        comp_list.push([elem[0].split("|")[0].trim(),elem[0].split("|")[1].trim(),elem[1]])
        sessionStorage.setItem('rescomplist',JSON.stringify(comp_list))
        setCompList(comp_list)
      })
      console.log(comp_list)
    })
  }

 

  return (
    (profile.studentDetails==undefined)?<Navigate to="/" replace={true}/>:
    <div className="page-container">
      <Outlet/>
      <div className="Contact">
        <div className="page">
          {activeBtn===1?complist.length!==0&&complist.map((elem,ind) => (
            <NavLink key={'resbycomp'+elem[2]} to={'/result/byjobpost/'+elem[2]} className='job-post'>  
              <h2>{elem[0]}</h2>
              <p>{elem[1]}</p>
            </NavLink>
          )):
          <form className='profile-form' style={{display:'grid',minWidth:'300px'}}>
                <label htmlFor="res-batch-input">Batch</label>
                <span> : </span>
                <select ref={batchRef} className='profile-input' defaultValue={currbatch}>
                    {
                    [0,1,2,3,4,5].map((elem,ind)=> <option key={'batch-'+ind} value={currbatch-elem}>{currbatch-elem}</option> )}
                </select>
                <label htmlFor="cert-date-input">Branch</label>
                <span> : </span>
                <select ref={branchRef} className='profile-input' defaultValue={profile.studentDetails.branch}>
                    {["IT","ME","EEE","ECE","CSE"].map((elem,ind)=> {
                         return <option key={'batch-'+ind} value={elem}>{elem}</option>;})}
                </select>
                <label>Action</label>
                <span>:</span>
                <select ref={formActionRef} className='profile-input' defaultValue={'placements'}>
                    <option value="placements">Placements List</option>
                    <option value="profiles">View all Profiles</option>
                </select>
                <span></span>
                <span></span>
                <NavLink className='profile-input res-sub-btn' onClick={
                  (e)=>{

                    e.preventDefault();
                    let resURL = 'getres/bybranch/'+batchRef.current.value+'/'+branchRef.current.value;
                    console.log(formActionRef.current.value)
                    if(formActionRef.current.value==='profiles'){
                      resURL = 'getprofiles/bybranch/'+batchRef.current.value+'/'+branchRef.current.value;
                    }
                    console.log(resURL);
                    navigator(resURL)
                  }
                }>Go</NavLink>
          </form>
          }
          
          <div className="empty"></div>
        </div>
      </div>

      <div id='res-card-filter' className="ResultFooter footernav">
        <li
          className={activeBtn === 0 ? 'active-btn' : ''}
          onClick={() => setActiveBtn(0)}
        >
          by Branch
        </li>
        <li
          className={activeBtn === 1 ? 'active-btn' : ''}
          onClick={() => setActiveBtn(1)}
        >
          by Company
        </li>
      </div>
    </div>
  );
}

export default ResultsListPage;