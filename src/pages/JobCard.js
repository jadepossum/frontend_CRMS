import React from 'react'

function JobCard() {
  return (
    <div className='page-container'>
        <div className="Contact">
            <div className='card'>
                {/* <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Student 1" className="card-img" width={'100px;'}/>
                <div className="card-content">
                    <h3 className="card-name">Alice</h3>
                    <p className="card-role">Web Developer at Google</p>
                    <p className="card-package">₹ 15 LPA</p>
                    <p className="card-info">Alice is a web developer who can create responsive and user-friendly websites using HTML, CSS, and JavaScript. She has experience with Bootstrap, jQuery, and other web frameworks.</p>
                    <a href="https://www.linkedin.com/in/alice/" className="card-link">View Profile</a>
                </div> */}
                <div className="card-header">
                    <h3 className="card-title">Web Developer</h3>
                    <p className="card-subtitle">Full-time, Remote</p>
                </div>
                <div className="card-body">
                    <p className="card-text">We are looking for a web developer who can create responsive and user-friendly websites using HTML, CSS, and JavaScript. You will be working with a team of designers and developers to deliver high-quality web projects for our clients.</p>
                    <ul className="card-list">
                        <h3>Candidature Requirements </h3>
                        <li>Experience with HTML, CSS, and JavaScript</li>
                        <li>Knowledge of Bootstrap, jQuery, and other web frameworks</li>
                        <li>Ability to work independently and collaboratively</li>
                        <li>Good communication and problem-solving skills</li>
                      </ul>
                 </div>
                <p>Visit link :</p>
                <a href='https://www.companyexample.com/career/webdev/' className='card-link'>https://www.companyexample.com/career/webdev/</a>
                <br/>
                <button className="apply-button">Apply</button>
            </div>
        </div>
    </div>
  )
}

export default JobCard