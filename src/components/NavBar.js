import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { useAuth } from '../Login/contexts/AuthContext';

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
    <div>
      <ul>
        <Col
          lg={{ offset: 3, span: 6 }}
          className='d-flex justify-content-between'
        >
          <div className='d-flex justify-content-start'>
            <li className='d-flex align-items-center me-4'>
              <i className='fas fa-address-card'></i>
              <Link to='/'>Home</Link>
            </li>
            <li className='d-flex align-items-center me-4'>
              <i className='fas fa-link'></i>
              <Link to='/connect'>Connect</Link>
            </li>
            <li className='d-flex align-items-center'>
              <i className='fas fa-stream'></i>
              <Link to='/timeline'>Timeline</Link>
            </li>
          </div>
          <div className='d-flex align-items-center'>
            <li>
              <i className='fas fa-sign-out-alt' onClick={handleLogout}></i>
            </li>
          </div>
        </Col>
      </ul>
    </div>
  );
};

export default NavBar;
