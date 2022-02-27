import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { useAuth } from './Login/AuthContext';

const NavBar = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
    navigate('/login');
  };

  return (
    <ul className='navbar'>
      <Col
        lg={{ offset: 3, span: 6 }}
        className='d-flex justify-content-evenly'
      >
        <li className='d-flex align-items-center me-4 navbar-list'>
          <i className='fas fa-stream'></i>
          <Link to='/'>Timeline</Link>
        </li>
        <li className='d-flex align-items-center me-4 navbar-list'>
          <i className='fas fa-link'></i>
          <Link to='/connect'>Connect</Link>
        </li>
        <li className='d-flex align-items-center me-4 navbar-list'>
          <i className='fas fa-user'></i>
          <Link to='/profile'>Profile</Link>
        </li>
        <li className='d-flex align-items-center navbar-list'>
          <i className='fas fa-door-open me-2'></i>
          <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Log out
          </span>
        </li>
      </Col>
    </ul>
  );
};

export default NavBar;
