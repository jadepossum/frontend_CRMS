import React, { useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/userAuthContext';
function ResultsListPage() {
  const {profile} = useAuth()
  const [activeBtn, setActiveBtn] = useState(0);

  useEffect(() => {
    const filterOptions = document.querySelectorAll('.ResultFooter > li');

    filterOptions.forEach((elem, index) => {
      elem.addEventListener('click', () => {
        if (elem.classList.contains('active-btn')) {
          console.log(elem.innerHTML);
        } else {
          filterOptions.forEach((option, i) => {
            if (i === index) {
              option.classList.add('active-btn');
            } else {
              option.classList.remove('active-btn');
            }
          });
        }
      });
    });

    return () => {
      filterOptions.forEach((elem) => {
        elem.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    (profile.studentDetails==undefined)?<Navigate to="/" replace={true}/>:
    <div className="page-container">
      <div className="Contact">
        <div className="page">
          <NavLink to="1" className="result">
            CSE
          </NavLink>
          <NavLink to="1" className="result">
            IT
          </NavLink>
          <NavLink to="1" className="result">
            EEE
          </NavLink>
          <NavLink to="1" className="result">
            ECE
          </NavLink>
          <NavLink to="1" className="result">
            MECH
          </NavLink>
          <div className="empty"></div>
        </div>
      </div>
      <div className="ResultFooter footernav">
        <li
          className={activeBtn === 0 ? 'active-btn' : ''}
          onClick={() => setActiveBtn(0)}
        >
          by Branch
        </li>
        <li
          className={activeBtn === 1 ? 'active-btn' : ''}
          onClick={() => setActiveBtn(1)}
        >
          by Company
        </li>
      </div>
    </div>
  );
}

export default ResultsListPage;