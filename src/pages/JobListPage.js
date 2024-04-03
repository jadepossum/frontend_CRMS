import React,{useState, useEffect} from 'react'
import JPost from '../Components/JPost'
const JobListPage = () => {
    let [jposts, setPosts] = useState([]);
    useEffect(() => {
    getPosts()
  },[])

  let getPosts = async ()=>{
    let res = await fetch('api/getjobs')
    let posts = await res.json()
    // console.log('data :',posts)
    setPosts(posts)
  }

  var filt = false
  var filteroptions = document.querySelectorAll('.JobFooter > li')
  filteroptions.forEach(elem=>{
      elem.addEventListener('click',()=>{
        if(!elem.classList.contains("active-btn")){
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
          <JPost key={1} jpost={{"Title":"Web Developer","Description":"Web developers create and maintain websites and web applications for various purposes, such as e-commerce, education, entertainment, or social media. They use web technologies, such as HTML, CSS, JavaScript, and PHP, to design and implement the front-end and back-end of the web pages and applications.","Id":1}} />
          <JPost key={2} jpost={{"Title":"Software Developer","Description":"Software developers create, test, and maintain software applications for various purposes, such as web development, mobile development, gaming, or data analysis. They use programming languages, frameworks, and tools to design and implement software solutions.","Id":2}} />
          <JPost key={3} jpost={{"Title":"Information Security Analyst","Description":"Information security analysts protect the data and systems of organizations from unauthorized access, attacks, or breaches. They use various techniques and tools to monitor, analyze, and respond to security incidents and threats. They also implement security policies and best practices to ensure the safety and privacy of information.","Id":3}} />
          <JPost key={4} jpost={{"Title":"Data Scientist","Description":"Data scientists collect, process, and analyze large and complex datasets to extract meaningful insights and patterns. They use statistical methods, machine learning algorithms, and visualization tools to perform data mining, modeling, and interpretation. They also communicate their findings and recommendations to stakeholders and decision-makers.","Id":4}} />
          <JPost key={5} jpost={{"Title":"Software Tester","Description":"Software testers verify and validate the quality and functionality of software products or systems. They use various methods and tools to perform testing activities, such as unit testing, integration testing, system testing, and user acceptance testing. They also identify, report, and resolve software defects and issues.","Id":5}} />
          <JPost key={6} jpost={{"Title":"Database Administrator","Description":"Database administrators manage the data storage and retrieval systems of an organization. They ensure the security, integrity, and availability of the data and databases. They also perform tasks such as backup, recovery, tuning, and troubleshooting of the databases.","Id":6}} />
          <JPost key={7} jpost={{"Title":"Computer Systems Analyst","Description":"Computer systems analysts evaluate the existing IT systems and processes of an organization and recommend improvements or solutions. They analyze the business needs, technical requirements, and budget constraints of the organization and design optimal IT systems that meet those criteria.","Id":7}} />
          {
            jposts.map((post)=>{
              console.log('post :',post)
              return <JPost key={post.id} jpost={post} />
            })
          }
        </div>
      </div>
      <div className="footernav JobFooter">
              <li onClick={console.log('filter applied')} className='active-btn'>For me</li>
              <li onClick={console.log('filter applied')}>All</li>
        </div>
    </div>
  )
}

export default JobListPage