import React, {useEffect} from 'react';

function ProfilePage() {

    // const addcert = document.querySelector('.add-cert');
    // const savecert = document.querySelector('.save-cert');
    // const certform = document.querySelector('.add-cert-form');
    useEffect(() => { 
        
        // event listener to show experience form

        // internform.style.display = 'none';
        // certform.style.display = 'none';

        document.querySelector('.add-intern').addEventListener('click', (e) => {
            console.log(e.target.innerHTML,'intern -clicked')
            if (e.target.innerHTML == 'Add'){
                console.log('Add clicked')
                document.querySelector('.add-intern-form').style.display = 'grid';
                document.querySelector('.save-intern').style.display = 'inline';
                e.target.innerHTML = 'cancel'
                // return
            }
            else if(e.target.innerHTML === 'cancel'){
                console.log('cancel clicked')
                document.querySelector('.add-intern-form').style.display = 'none';
                document.querySelector('.save-intern').style.display = 'none';
                e.target.innerHTML = 'Add'
                // return
            }
        });

        // event listener to save experience form
        document.querySelector('.save-intern').addEventListener('click', (e) => {
            // Submit form data to the backend
            // Update the page with the new experience data
            // Hide the experience form
            document.querySelector('.add-intern').innerHTML = 'Add';
            document.querySelector('.add-intern-form').style.display = 'none';
            e.target.style.display = 'none'
        });

        // event listener to show certifications form
        document.querySelector('.add-cert').addEventListener('click', (e) => {
            if (e.target.innerHTML == 'Add'){
                document.querySelector('.add-cert-form').style.display = 'grid';
                document.querySelector('.save-cert').style.display = 'inline';
                e.target.innerHTML = 'cancel'
                // return
            }
            else if(e.target.innerHTML == 'cancel'){
                document.querySelector('.add-cert-form').style.display = 'none';
                document.querySelector('.save-cert').style.display = 'none';
                e.target.innerHTML = 'Add'
                // return
            }
        });

        // event listener to save certifications form
        document.querySelector('.save-cert').addEventListener('click', (e) => {
            // Submit form data to the backend
            // Update the page with the new certifications data
            // Hide the certifications form
            document.querySelector('.add-cert').innerHTML = 'Add';
            document.querySelector('.add-cert-form').style.display = 'none';
            e.target.style.display = 'none'
        });

        return () => {
          document.querySelector('.profile-page button').removeEventListener('click', ()=>{});
        };
      }, []);

return (
    <div className='page-container'>
        <div className='profile-page Contact'>
            <div className="profile">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile Image" className="profile-image"/>
                <div className="profile-info">
                    <div className="profile-name">Student Name</div>
                    <div className="profile-contact">
                        <img src="https://cdn-icons-png.freepik.com/256/3916/3916611.png?ga=GA1.1.131145598.1708596530&" alt="Email Icon" className="profile-contact-icon"/>
                        <a href="mailto:student1@example.com" className="profile-contact-link">student1@example.com</a>
                    </div>
                    <div className="profile-contact">
                        <img src="https://cdn-icons-png.freepik.com/256/8034/8034631.png?ga=GA1.1.131145598.1708596530&" alt="Phone Icon" className="profile-contact-icon"/>
                        <a href="tel:+1234567890" className="profile-contact-link">+1234567890</a>
                    </div>
                    <div className="profile-contact">
                        <img src="https://cdn-icons-png.freepik.com/256/6422/6422202.png?ga=GA1.1.131145598.1708596530&" alt="LinkedIn Icon" className="profile-contact-icon"/>
                        <a href="https://www.linkedin.com/in/Student-1" className="profile-contact-link">linkedin.com/in/john-doe</a>
                    </div>
                    <h2>Skills :</h2>
                    <div className="profile-skills">
                        <div className="profile-skill">HTML</div>
                        <div className="profile-skill">CSS</div>
                        <div className="profile-skill">JavaScript</div>
                        <div className="profile-skill">React</div>
                        <div className="profile-skill">Node.js</div>
                        <div className="profile-skill">MongoDB</div>
                    </div>
                </div>
            </div>
            <div className="profile-education">
                <div className="profile-education-title">Education</div>
                <div className="profile-education-item">
                    {/* <img src="university-logo.jpg" alt="University Logo" className="profile-education-logo"/> */}
                    <div className="profile-education-info">
                        <div className="profile-education-name">University of ABC</div>
                        <div className="profile-education-degree">Bachelor of Science in Computer Science</div>
                    </div>
                    <div className="profile-education-year">2018 - 2022</div>
                </div>
                {/* <div className='add-edu-form profile-form'>
                    <label>Instition name : </label>
                    <input type='text'/><br/>
                    <label>Duration : </label>
                    <input placeholder='From'  onFocus={(e)=>{e.target.type = 'date'}} onBlur={(e)=>{e.target.type = 'text'}}/>:  
                    <input placeholder='To'  onFocus={(e)=>{e.target.type = 'date'}} onBlur={(e)=>{e.target.type = 'text'}}/><br/>
                </div> */}
                    {/* <button onClick={(e)=>{
                        // document.querySelector('.add-edu-form').classList.add('show-form')
                        document.querySelector('.add-edu-form').style.display = 'block';
                        // document.querySelector('.add-edu-btn').style.display = 'none';
                    }} className='add-edu-btn'>add</button>
                    <button className='add-edu-save'>Save</button> */}
            </div>
            <div className="profile-experience">
                <div className="profile-experience-title">Internship</div>
                <div className="profile-experience-item">
                    {/* <img src="company-logo.jpg" alt="Company Logo" className="profile-experience-logo"/> */}
                    <div className="profile-experience-info">
                        <div className="profile-experience-name">ABC Company</div>
                        <div className="profile-experience-role">Web Developer Intern</div>
                    </div>
                    <div className="profile-experience-year">Jan 2022 - Present</div>
                </div>
                <div className="profile-experience-item">
                    {/* <img src="project-logo.jpg" alt="Project Logo" className="profile-experience-logo"/> */}
                    <div className="profile-experience-info">
                        <div className="profile-experience-name">XYZ Project</div>
                        <div className="profile-experience-role">Web Developer Volunteer</div>
                    </div>
                    <div className="profile-experience-year">Oct 2021 - Dec 2021</div>
                </div>
                <div className='add-intern-form profile-form'>
                    <label>Organization name</label>
                    <span> : </span>
                    <input className='profile-input' type='text'/>
                    <label>Role</label>
                    <span> : </span>
                    <input className='profile-input' type='text'/>
                    <label>Duration</label>
                    <span> : </span>
                    <input className='profile-input' placeholder='From'  onFocus={(e)=>{e.target.type = 'date'}} onBlur={(e)=>{e.target.type = 'text'}}/>  
                    <input className='profile-input' placeholder='To'  onFocus={(e)=>{e.target.type = 'date'}} onBlur={(e)=>{e.target.type = 'text'}}/>
                </div>
                <div className='profile-btn-container'>
                    <button className='add-intern'>Add</button>
                    <button className='save-intern'>Save</button>
                </div>
            </div>
            <div className="profile-certifications">
                    <div className="profile-certifications-title">Certifications</div>
                    <div className="profile-certifications-item">
                        <div className="profile-certifications-info">
                            <a href='' className="profile-certifications-name">Certification Name</a>
                            <div className="profile-certifications-domain">Domain/Technology</div>
                            <div className="profile-certifications-skills">
                                <div className="profile-certifications-skill">Skill 1</div>
                                <div className="profile-certifications-skill">Skill 2</div>
                            </div>
                        </div>
                        <div className="profile-certifications-year">Year Earned</div>
                    </div>
                    <div className='add-cert-form profile-form'>
                        <label>Title</label>
                        <span> : </span>
                        <input className='profile-input' type='text'/>
                        <label>URL</label>
                        <span> : </span>
                        <input className="profile-input"  type='url'/>
                        <label>Skills</label>
                        <span> : </span>
                        <input className="profile-input" type='text'/>
                        <label>Domain / Technology</label>
                        <span> : </span>
                        <input className='profile-input' type='text'/>
                        <label>Year Earned</label>
                        <span> : </span>
                        <input className="profile-input" type='text'/>
                    </div>
                    <div className="profile-btn-container">
                        <button className='add-cert'>Add</button>
                        <button className='save-cert'>Save</button>
                    </div>
                </div>
        </div>
    </div>
)
}

export default ProfilePage