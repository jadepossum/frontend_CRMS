import React from 'react'

function ProfilePage() {
    document.onload = function(){
        document.querySelector('.profile-skills > button').addEventListener('click',
        ()=>{
            let newitem = document.createElement('input')
        })
    }
  return (
    <div className='page-container'>
        <div className='profile-page Contact'>
              <div class="profile">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile Image" class="profile-image"/>
                <div class="profile-info">
                    <div class="profile-name">Student Name</div>
                    <div class="profile-contact">
                        <img src="https://cdn-icons-png.freepik.com/256/3916/3916611.png?ga=GA1.1.131145598.1708596530&" alt="Email Icon" class="profile-contact-icon"/>
                        <a href="mailto:student1@example.com" class="profile-contact-link">student1@example.com</a>
                    </div>
                    <div class="profile-contact">
                        <img src="https://cdn-icons-png.freepik.com/256/8034/8034631.png?ga=GA1.1.131145598.1708596530&" alt="Phone Icon" class="profile-contact-icon"/>
                        <a href="tel:+1234567890" class="profile-contact-link">+1234567890</a>
                    </div>
                    <div class="profile-contact">
                        <img src="https://cdn-icons-png.freepik.com/256/6422/6422202.png?ga=GA1.1.131145598.1708596530&" alt="LinkedIn Icon" class="profile-contact-icon"/>
                        <a href="https://www.linkedin.com/in/Student-1" class="profile-contact-link">linkedin.com/in/john-doe</a>
                    </div>
                    <h2>Skills :</h2>
                    <div class="profile-skills">
                        <div class="profile-skill">HTML</div>
                        <div class="profile-skill">CSS</div>
                        <div class="profile-skill">JavaScript</div>
                        <div class="profile-skill">React</div>
                        <div class="profile-skill">Node.js</div>
                        <div class="profile-skill">MongoDB</div>
                        <button>add</button>
                    </div>
                </div>
              </div>
              <div class="profile-education">
                  <div class="profile-education-title">Education</div>
                  <div class="profile-education-item">
                      {/* <img src="university-logo.jpg" alt="University Logo" class="profile-education-logo"/> */}
                      <div class="profile-education-info">
                          <div class="profile-education-name">University of ABC</div>
                          <div class="profile-education-degree">Bachelor of Science in Computer Science</div>
                      </div>
                      <div class="profile-education-year">2018 - 2022</div>
                  </div>
                  <button>add</button>
              </div>
              <div class="profile-experience">
                  <div class="profile-experience-title">Experience</div>
                  <div class="profile-experience-item">
                      {/* <img src="company-logo.jpg" alt="Company Logo" class="profile-experience-logo"/> */}
                      <div class="profile-experience-info">
                          <div class="profile-experience-name">ABC Company</div>
                          <div class="profile-experience-role">Web Developer Intern</div>
                      </div>
                      <div class="profile-experience-year">Jan 2022 - Present</div>
                  </div>
                  <div class="profile-experience-item">
                      {/* <img src="project-logo.jpg" alt="Project Logo" class="profile-experience-logo"/> */}
                      <div class="profile-experience-info">
                          <div class="profile-experience-name">XYZ Project</div>
                          <div class="profile-experience-role">Web Developer Volunteer</div>
                      </div>
                      <div class="profile-experience-year">Oct 2021 - Dec 2021</div>
                  </div>
                  <button>Add</button>
              </div>
        </div>
    </div>
  )
}

export default ProfilePage