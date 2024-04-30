import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AnimateSpin from './AnimateSpin';

function ProfileDispCard() {
    const {studentid} = useParams();
    const [pageloading,setPageLoading] = useState(true)
    const [studentprofile,setProfile] = useState({})
    
    useEffect(()=>{
        console.count("profileDisp in action")
        if(studentprofile.studentDetails==undefined){
            fetch('/api/getstudentprofile?studentid='+studentid)
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                setProfile(data)
                setPageLoading(false)
            }).catch(err=>console.log(err))
        }
        return ()=>{
            console.count("profileDisp cleanup")
        }
    })

  return pageloading?<div style={{width:"100%",height:"100%"}}><div className='Contact'><AnimateSpin/></div></div>:(
    <div style={{height: '100%'}}>
         <div className='profile-page Contact'>
        <div className="profile">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile-icon" className="profile-image"/>
            <div className="profile-info">

                <div className="profile-name">{studentprofile.studentDetails.name}</div>

                <div className="profile-contact">
                    <img src="https://cdn-icons-png.freepik.com/256/3916/3916611.png?ga=GA1.1.131145598.1708596530&" alt="Email Icon" className="profile-contact-icon"/>
                    <a href={studentprofile.studentDetails.email} target='' className="profile-contact-link">{studentprofile.studentDetails.email}</a>
                </div>

                <div className="profile-contact">
                    <img src="https://cdn-icons-png.freepik.com/256/8034/8034631.png?ga=GA1.1.131145598.1708596530&" alt="Phone Icon" className="profile-contact-icon"/>
                    <a href="tel:+1234567890" className="profile-contact-link">{studentprofile.studentDetails.phone}</a>
                </div>

                <div className="profile-contact">
                    <img src="https://cdn-icons-png.freepik.com/256/6422/6422202.png?ga=GA1.1.131145598.1708596530&" alt="LinkedIn Icon" className="profile-contact-icon"/>
                    <a href={studentprofile.studentDetails.linkedin_profile} target='blank' className="profile-contact-link">linkedin</a>
                </div>

                <div className="profile-contact">
                    <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="Github Icon" className="profile-contact-icon"/>
                    <a href={studentprofile.studentDetails.github_profile} target='blank' className="profile-contact-link">github</a>
                </div>
                
                <h2>Skills :</h2>
                <div className="profile-skills">
                    {
                    studentprofile?.certificationDetails?.reduce((skills,cert)=> skills.concat(cert.skills.split(',')),[]).map((skill,idx) => {
                        return <div key={idx} className="profile-skill">{skill}</div>
                    })
                    }
                </div>
            </div>
        </div>

        <div className="profile-certifications">
                <div className="profile-certifications-title">Certifications</div>

            {studentprofile?.certificationDetails?.map(cert => {
                return <div key={cert.id + 5000} className="profile-certifications-item">
                            <div className="profile-certifications-info">
                                <a href={cert.url} target='blank' className="profile-certifications-name">{cert.title}</a>
                                {/* <div className="profile-certifications-domain">{cert.domain_technology}</div> */}
                                <div className="profile-certifications-skills">
                                    {cert.skills.split(',').map((skill,idx) => {
                                        return <div key={cert.id+idx} className="profile-certifications-skill">{skill}</div>
                                    })}
                                </div>
                            </div>
                            <div className="profile-certifications-year">{cert.year_earned}</div>
                            <br/>
                        </div>
            })}

        </div>

        <div className="profile-experience">
            <div className="profile-experience-title">Internship</div>
            {/* <div className="profile-experience-item"> */}
            {studentprofile?.internshipDetails?.map((intern,index) => {
                return <div key={intern.id + 15000} className="profile-experience-item">
                            {/* <img src={intern.logo} alt={intern.name} className="profile-experience-logo"/> */}
                            <div className="profile-experience-info">
                                <div className="profile-experience-name">{intern.company_name}</div>
                                <div className="profile-experience-role">{intern.role}</div>
                            </div>
                            <div className="profile-experience-year">{intern.start_date.substring(5,7)+'/'+intern.start_date.substring(0,4)} - {intern.end_date.substring(5,7)+'/'+intern.end_date.substring(0,4)}</div>
                        </div>
            })}

        </div>

        <div className="profile-education">
            <div className="profile-education-title">Education</div>
            <div className="profile-education-item">
                {/* <img src="university-logo.jpg" alt="University Logo" className="profile-education-logo"/> */}
                <div className="profile-education-info">
                    <div className="profile-education-name">JNTUH University College of Engineering Jagtial</div>
                    <div className="profile-education-degree">Bachelor of Technology in C.S.E</div>
                </div>
                <div className="profile-education-year">2020 - 2024</div>
            </div>
            
        </div>
        </div>
    </div>
  )
}

export default ProfileDispCard