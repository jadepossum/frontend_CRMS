import React,{useState, useEffect, useRef} from 'react'
import { useAuth } from '../hooks/userAuthContext';
import {Navigate} from 'react-router-dom'
import ModalCard from '../Components/ModalCard';
import JobPost from '../Components/JobPost';
import AnimateSpin from '../Components/AnimateSpin';
const JobListPage = () => {
    const secondload = useRef(false)
    const fetchcomplete =useRef(0)

    const {isLoggedIn} = useAuth()
    const [isLoading,setIsLoading] = useState(true)
    const [errMsg,setErrMsg] = useState('')
    const [selectedjobid,setSelectedJob] = useState(null)
    const [hasNextPage,setHasNextPage] = useState(true);
    const [jposts, setPosts] = useState([]);
    const [pagecount,setPageCount] = useState(1);
    
    useEffect(() => {
      console.count("joblist useEffect in action")
      // const controller = new AbortController()
      // const signal = controller.signal
      if(secondload.current===true){
        if(sessionStorage.getItem('posts')===null){
          console.log("fetching posts")
          getPosts()
        } 
        else {
          console.log("setting posts from sessionstorage")
            setPosts(JSON.parse(sessionStorage.getItem('posts')))
            setIsLoading(false)
          }
        if(sessionStorage.getItem('currentPageCount')!==null){
          console.log("setting page count from sessionStorage")
          setPageCount(JSON.parse(sessionStorage.getItem('currentPageCount')))
        }
      }
      // console.log('profile is :',profile) 
      return ()=>{
        console.count("joblist cleanup code")
        // controller.abort()
        secondload.current = true;
      }
    },[])
    
    const getPosts = async ()=>{
      if(fetchcomplete.current==1) return null;
      setIsLoading(true)
      console.log("isLoading :",isLoading)
      await fetch("api/getjobs?page=" + pagecount,{method : "GET"})
      .then(res=>res.json())
      .then(data=>{
        console.log("has-next-page : ",data.hasNextPage,"  current-page :",data.currentPage,)
        if(data.posts===undefined){
          setErrMsg(data)
        }
        else{
              if(pagecount===1){
                console.log('fetched joblist page 1 :',data.posts)
                sessionStorage.setItem('posts',JSON.stringify(data.posts))
                setPosts(data.posts)
              }else{
                console.log("fetched joblist page :",pagecount,data.posts)
                let newtotposts = [...jposts,...data.posts];
                // newtotposts = newtotposts.concat(data.posts);
                console.log("newtotposts :",newtotposts)
                sessionStorage.setItem('posts',JSON.stringify(newtotposts))
                setPosts(newtotposts)
              }
              if(data.hasNextPage){
                console.log("data has next page : ",data.currentPage)
                setPageCount(prevcount=>prevcount+1)
                sessionStorage.setItem('currentPageCount',JSON.stringify(pagecount))
              }
              else setHasNextPage(data.hasNextPage)
        }
        setIsLoading(false)
      })
      .catch(err=>console.log(err))
      fetchcomplete.current = 0
      console.log('isLoading :',isLoading)
    }
  
    const filterClickHandler = (event)=>{
      const filteroptions = document.querySelectorAll('.JobFooter > li');
      filteroptions.forEach(elem => {
          if (!event.target.classList.contains("active-btn")) {
            filteroptions[0].classList.remove('active-btn');
            filteroptions[1].classList.remove('active-btn');
            event.target.classList.add('active-btn');
          }
        })
    }

    return (
      (isLoggedIn===false)?<Navigate to="/" replace={true} />:
      <div className='page-container'>
        <div className='Contact'>
          {pagecount===1&&isLoading===true?<AnimateSpin/>:
          <div className='page'>
            <ModalCard job={jposts[0]} open={selectedjobid} resetSelected = {()=>{setSelectedJob(null)}}></ModalCard>
            {
             jposts.map((post)=>{
                {/* return <JPost key={post.id} jpost={post} /> */}
                return <JobPost key={post.id} jpost={post} setjob ={(jb)=>{setSelectedJob(jb)}}/>
              })
            }
            <JobPost key={4454545} jpost={{"Title":"Data Scientist","Description":"Data scientists collect, process, and analyze large and complex datasets to extract meaningful insights and patterns. They use statistical methods, machine learning algorithms, and visualization tools to perform data mining, modeling, and interpretation. They also communicate their findings and recommendations to stakeholders and decision-makers.","Id":4}} />
            {pagecount!==1&&isLoading===true?<div className='load-spin-outer-container'><AnimateSpin/></div>:null}
            {(!isLoading)&&hasNextPage&&
            <button key={5454545}
                  className='load-more-jobs job-post'
                  onClick={()=>{getPosts();fetchcomplete.current=1}}
              >Load More</button>}
          </div>
          }

        </div>
        <div className="footernav JobFooter">
                <li onClick={(e)=>filterClickHandler(e)} className='active-btn'>For me</li>
                <li onClick={(e)=>filterClickHandler(e)}>All</li>
                {/* <li onClick={console.log('filter applied')} className='active-btn'>For me</li>
                <li onClick={console.log('filter applied')}>All</li> */}
        </div>
      </div>
    )
  }

export default JobListPage