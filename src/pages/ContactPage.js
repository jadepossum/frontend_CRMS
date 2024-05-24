import React from 'react'

function ContactPage() {


  return (
    <div className='page-container'>
        <div className="Contact">
          <div className="C-header">
            <img src="https://i0.wp.com/jntuwing.in/wp-content/uploads/2022/02/71B14E20-F721-4482-B367-C06C9CF82633.png?resize=205%2C192&ssl=1" alt="Institute Logo" width={"100px"}/>
            <h1>JNTUH University College of Engineering Jagtial</h1>
          </div>
          <div className="TPOdetails inner-container">
              <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="TPO Photo" width={"100px"}/>
              <div className="TPOinfo">
                <h3><b>TPO NAME</b></h3>
                <p>TPO Designation</p>
                <br/>
                <img src='https://cdn-icons-png.freepik.com/256/8034/8034631.png?ga=GA1.1.131145598.1708596530&'  width={"25px"}/>
                <span> TPO Phone</span><br/>
                <img src="https://cdn-icons-png.freepik.com/256/3916/3916611.png?ga=GA1.1.131145598.1708596530&" alt="Email Icon" className="profile-contact-icon"/>
                <span>   TPO mail_id</span>
              </div>
          </div>
          <div className="stats inner-container">
            {/* <h3>About TPO and Recruitment Office</h3>
            <p></p> */}
            <h3>Here are some of the highlights and statistics of the past placements:</h3>
            <ul>
              <li>Highlight-1</li>
              <li>Highlight-2</li>
              <li>Highlight-3</li>
              <li>Highlight-4</li>
              <li>Highlight-5</li>
            </ul>
          </div>
      </div>
    </div>
  )
}

export default ContactPage