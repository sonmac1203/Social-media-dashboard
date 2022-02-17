import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <ul className='d-flex justify-content-center'>
        <li className='d-flex align-items-center me-5'>
          <i className='fas fa-link'></i>
          <Link to='/'>Connect</Link>
        </li>
        <li className='d-flex align-items-center'>
          <i className='fas fa-stream'></i>
          <Link to='/timeline'>Timeline</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
