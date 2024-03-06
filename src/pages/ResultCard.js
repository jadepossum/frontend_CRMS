import React from 'react'
import {NavLink} from 'react-router-dom'
function ResultCard() {
  return (
    <div className='page-container'>
        <div className='Contact result-table'>
            <table>
                <thead>
                    <tr>
                    <th>Person</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td><NavLink to="profile/student1">Student1</NavLink></td>
                    <td>Company1</td>
                    <td>System Engineer</td>
                    <td>₹ 10 LPA</td>
                    </tr>
                </tbody>
                </table>
        </div>

    </div>
  )
}

export default ResultCard