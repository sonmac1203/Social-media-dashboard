import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

const NavBar = () => {
  const [cShown, setCShown] = useState(false);
  const [mShown, setMShown] = useState(false);
  const [tShown, setTShown] = useState(false);

  return (
    <div>
      <ul>
        <Col lg={{ offset: 3 }} className='d-flex justify-content-start'>
          <li className='d-flex align-items-center me-4'>
            <i className='fas fa-link'></i>
            <Link to='/'>Connect</Link>
          </li>
          <li className='d-flex align-items-center me-4'>
            <i className='fas fa-address-card'></i>
            <Link to='/management'>Management</Link>
          </li>
          <li className='d-flex align-items-center'>
            <i className='fas fa-stream'></i>
            <Link to='/timeline'>Timeline</Link>
          </li>
        </Col>
      </ul>
    </div>
  );
};

export default NavBar;
