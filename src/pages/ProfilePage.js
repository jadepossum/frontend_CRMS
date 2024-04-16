import React, {useEffect, useState} from 'react';
import { useAuth } from '../hooks/userAuthContext';
import {Navigate} from 'react-router-dom';
function ProfilePage() {
    const {user,isloggedIn,profile,setProfile,csrftoken} = useAuth();
    const [seed,setSeed] = useState(false)
    useEffect(() => {
        console.log("profile is :",profile)
    },[profile])

    function addClickHandler(e) {
        e.preventDefault();
        e.target.innerHTML == 'Add'?e.target.innerHTML = 'Cancel':e.target.innerHTML = 'Add';
        if(e.target.innerHTML == 'Add'){
            if(e.target.classList.contains('add-cert')){
                document.querySelector('.add-cert-form').style.display = 'none';
                document.querySelector('.add-cert-form').reset();
                document.querySelector('.save-cert').style.display = 'none';
            }
            else{
                document.querySelector('.add-intern-form').style.display = 'none';
                document.querySelector('.add-intern-form').reset()
                document.querySelector('.save-intern').style.display = 'none';
            }
        }
        else{
            if(e.target.classList.contains('add-cert')){
                document.querySelector('.add-cert-form').style.display = 'grid';
                document.querySelector('.save-cert').style.display = 'inline';
            }
            else{
                document.querySelector('.add-intern-form').style.display = 'grid';
                document.querySelector('.save-intern').style.display = 'inline';
            }
        }
        return null;
    }

    const uploadCertHandler= async (e)=>{
        e.preventDefault();
        if(e.target.classList.contains('save-cert')){
            document.querySelectorAll(".add-cert-form input").forEach((input)=>{
                if(input.value == ""){
                    alert("Please fill all the details");
                    return null;
                }
            })
            fetch("api/uploadCert",{
                method:"POST",
                headers : {'Content-Type' : 'application/json',
                'X-CSRFToken':csrftoken,},
                body : JSON.stringify({
                    "title" : document.querySelector('#cert-title-input').value,
                    "url" : document.querySelector('#cert-url-input').value,
                    "skills" : document.querySelector('#cert-skills-input').value,
                    "domain_technology" : document.querySelector('#cert-domain-input').value,
                    "year_earned" : document.querySelector('#cert-date-input').value,
                    "roll_number" : profile.studentDetails.roll_number,
                }),

            })
            .then(res => res.json())
            .then(data => {
                if(data.roll_number!=undefined){
                    console.log("upload res data : ",data)
                    console.log('changed profiel :',profile)
                    let certs = profile;
                    certs.certificationDetails.push(data)
                    seed?setSeed(false):setSeed(true)
                    setProfile(certs)
                    document.querySelector('.add-cert-form').reset()
                    document.querySelector('.add-cert').click()
                }
            })
        }
        return null;
    }

    const uploadInternHandler = async(e)=>{
        console.log("clicked handler")
            await fetch("api/uploadIntern",{
                method:"POST",
                headers : {'Content-Type' : 'application/json',
                'X-CSRFToken':csrftoken,},
                body : JSON.stringify({
                    "roll_number" : profile.studentDetails.roll_number,
                    "company_name" : document.querySelector('#intern-org-name').value,
                    "role" : document.querySelector('#intern-role').value,
                    "start_date" : document.querySelector('#intern-start-date').value,
                    "end_date" : document.querySelector('#intern-end-date').value,
                    "responsibilities" : document.querySelector('#intern-res').value,
                }),
                
            })
            .then(res => res.json())
            .then(data => {
                if(data.roll_number!=undefined){
                    console.log("upload res data : ",data)
                    console.log('changed profile :',profile)
                    let newprofile = profile;
                    newprofile.internshipDetails.push(data)
                    seed?setSeed(false):setSeed(true)
                    setProfile(newprofile)
                    document.querySelector('.add-intern-form').reset()
                    document.querySelector('.add-intern').click()
                }
            })

    }
return (
    (profile.studentDetails==undefined)?<Navigate to={'/'} replace={true}></Navigate>:
    (isloggedIn)?<div className='page-container'>profile not found</div>:
    <div className='page-container'>
        <div className='profile-page Contact'>

            <div className="profile">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile Image" className="profile-image"/>
                <div className="profile-info">

                    <div className="profile-name">{profile.studentDetails.name}</div>

                    <div className="profile-contact">
                        <img src="https://cdn-icons-png.freepik.com/256/3916/3916611.png?ga=GA1.1.131145598.1708596530&" alt="Email Icon" className="profile-contact-icon"/>
                        <a href={profile.studentDetails.email} target='' className="profile-contact-link">{profile.studentDetails.email}</a>
                    </div>

                    <div className="profile-contact">
                        <img src="https://cdn-icons-png.freepik.com/256/8034/8034631.png?ga=GA1.1.131145598.1708596530&" alt="Phone Icon" className="profile-contact-icon"/>
                        <a href="tel:+1234567890" className="profile-contact-link">{profile.studentDetails.phone}</a>
                    </div>

                    <div className="profile-contact">
                        <img src="https://cdn-icons-png.freepik.com/256/6422/6422202.png?ga=GA1.1.131145598.1708596530&" alt="LinkedIn Icon" className="profile-contact-icon"/>
                        <a href={profile.studentDetails.linkedin_profile} target='blank' className="profile-contact-link">linkedin</a>
                    </div>

                    <div className="profile-contact">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="Github Icon" className="profile-contact-icon"/>
                        <a href={profile.studentDetails.github_profile} target='blank' className="profile-contact-link">github</a>
                    </div>
                    
                    <h2>Skills :</h2>
                    <div className="profile-skills">
                        {
                        profile.certificationDetails.reduce((skills,cert)=> skills.concat(cert.skills.split(',')),[]).map((skill,idx) => {
                            return <div key={idx} className="profile-skill">{skill}</div>
                        })
                        }
                    </div>
                </div>
            </div>

            <div className="profile-certifications">
                    <div className="profile-certifications-title">Certifications</div>

                {(profile.certificationDetails!=undefined)&&profile.certificationDetails.map(cert => {
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

                    <form className='add-cert-form profile-form'>
                        <label htmlFor="cert-title-input">Title</label>
                        <span> : </span>
                        <input id="cert-title-input" className='profile-input' type='text'/>
                        <label htmlFor="cert-url-input">URL</label>
                        <span> : </span>
                        <input id="cert-url-input" className="profile-input"  type='url'/>
                        <label htmlFor="cert-skills-input">Skills</label>
                        <span> : </span>
                        <input id="cert-skills-input" className="profile-input" type='text'/>
                        <label htmlFor="cert-domain-input">Domain / Technology</label>
                        <span> : </span>
                        <select id="cert-domain-input" className='profile-input' >
                            <option>sdf</option>
                            <option>ertwert </option>
                            <option>erw</option>
                        </select>
                        <label htmlFor="cert-date-input">Date Earned</label>
                        <span> : </span>
                        <input id="cert-date-input" className="profile-input" type='date'/>
                    </form>


                    <div className="profile-btn-container">
                        <button className='add-cert' onClick={addClickHandler}>Add</button>
                        <button className='save-cert' onClick={uploadCertHandler}>Save</button>
                    </div>
            </div>

            <div className="profile-experience">
                <div className="profile-experience-title">Internship</div>
                {/* <div className="profile-experience-item"> */}
                {profile.internshipDetails.map((intern,index) => {
                    return <div key={intern.id + 15000} className="profile-experience-item">
                                {/* <img src={intern.logo} alt={intern.name} className="profile-experience-logo"/> */}
                                <div className="profile-experience-info">
                                    <div className="profile-experience-name">{intern.company_name}</div>
                                    <div className="profile-experience-role">{intern.role}</div>
                                </div>
                                <div className="profile-experience-year">{intern.start_date.substring(5,7)+'/'+intern.start_date.substring(0,4)} - {intern.end_date.substring(5,7)+'/'+intern.end_date.substring(0,4)}</div>
                            </div>
                })}

                <form className='add-intern-form profile-form'>
                    <label htmlFor='intern-org-name'>Organization name</label>
                    <span> : </span>
                    <input id='intern-org-name' className='profile-input' type='text' name=''/>
                    <label htmlFor='intern-role'>Role</label>
                    <span> : </span>
                    <input id='intern-role' className='profile-input' type='text'/>
                    <label htmlFor='intern-res'>Responsibilities</label>
                    <span> : </span>
                    <input id='intern-res' className='profile-input' type='text'/>
                    <label htmlFor='intern-start-date'>Duration</label>
                    <span> : </span>
                    <input id='intern-start-date' className='profile-input' placeholder='From'  onFocus={(e)=>{e.target.type = 'date'}} onBlur={(e)=>{e.target.type = 'text'}}/>  
                    <input id='intern-end-date' className='profile-input' placeholder='To'  onFocus={(e)=>{e.target.type = 'date'}} onBlur={(e)=>{e.target.type = 'text'}}/>
                </form>

                <div className='profile-btn-container'>
                    <button className='add-intern' onClick={addClickHandler}>Add</button>
                    <button className='save-intern' onClick={uploadInternHandler}>Save</button>
                </div>

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

export default ProfilePage