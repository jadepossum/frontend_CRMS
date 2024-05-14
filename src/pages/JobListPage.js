import React,{useState, useEffect, useRef} from 'react'
import { useAuth } from '../hooks/userAuthContext';
import {Navigate, Outlet} from 'react-router-dom'
import JobPost from '../Components/JobPost';
import AnimateSpin from '../Components/AnimateSpin';
const JobListPage = () => {
    // const secondload = useRef(false)
    const fetchcomplete =useRef(0)
    const [forMe,setForme] = useState(false)
    const {isLoggedIn,profile} = useAuth()
    const [isLoading,setIsLoading] = useState(true)
    const [errMsg,setErrMsg] = useState('')
    const [hasNextPage,setHasNextPage] = useState(true);
    const [jposts, setPosts] = useState([]);
    const [pagecount,setPageCount] = useState(1);
    
    useEffect(() => {
      console.count("joblist useEffect in action")
      // const controller = new AbortController()
      // const signal = controller.signal
        if(sessionStorage.getItem('posts')===null&&isLoggedIn){
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
      return ()=>{
        console.count("joblist cleanup code")
        // controller.abort()
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
                data.posts = addcriteria(data.posts)
                sessionStorage.setItem('posts',JSON.stringify(data.posts))
                setPosts(data.posts)
              }else{
                console.log("fetched joblist page :",pagecount,data.posts)
                data.posts = addcriteria(data.posts)
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

    const student = profile.studentDetails
    const addcriteria = (posts)=>{
      return posts.map(elem=>{
        if(!isLoggedIn) return null
        let select = true
        let criteria = elem.EligibilityCriteria
        if(criteria.min_cgpa>student.cgpa) select = false
        else if(criteria.max_backlog_count >student.BackLogCount) select=false
        else if(criteria.min_twelth_percentage >student.twelthPercentage) select=false
        else if(criteria.min_tenth_cgpa >student.tenthCGPA) select = false
        else if(criteria.no_year_gap){
          if(student.year_gap) select = false
        }
        elem['isEligible'] = select;
        return elem;
      })
    }
    jposts.map(elem=>{
      if(!isLoggedIn) return null
      let select = true
      let criteria = elem.EligibilityCriteria
      if(criteria.min_cgpa>student.cgpa) select = false
      else if(criteria.max_backlog_count >student.BackLogCount) select=false
      else if(criteria.min_twelth_percentage >student.twelthPercentage) select=false
      else if(criteria.min_tenth_cgpa >student.tenthCGPA) select = false
      else if(criteria.no_year_gap){
        if(student.year_gap) select = false
      }
      elem['isEligible'] = select;
      return elem;
    })

    const filtposts = jposts.filter(post=> post.isEligible);

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
        <Outlet totposts = {jposts}/>
        <div className='Contact'>
          {pagecount===1&&isLoading===true?<div className='load-spin-outer-container'><AnimateSpin/></div>:
          <div className='page'>              
              {forMe?filtposts.map((post)=>{
                  return <JobPost key={post.id} jpost={post}/>
                })
                :jposts.map((post)=>{
                  return <JobPost key={post.id} jpost={post} />
                })}

              {pagecount!==1&&isLoading===true?<div className='load-spin-outer-container'><AnimateSpin/></div>:null}

              {(!isLoading)&&hasNextPage&&
              <button key={5454545}
                    className='load-more-jobs job-post'
                    onClick={()=>{getPosts();fetchcomplete.current=1}}
                >Load More</button>}

          </div>
          }

        <div className="footernav JobFooter">
                <li onClick={(e)=>{filterClickHandler(e);setForme(true)}} >For me</li>
                <li onClick={(e)=>{filterClickHandler(e);setForme(false)}} className='active-btn'>All</li>
        </div>
        </div>
      </div>
    )
  }

export default JobListPage