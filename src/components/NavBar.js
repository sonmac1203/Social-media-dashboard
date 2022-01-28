import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Sidebar1 from './Sidebar1';
import Sidebar2 from './SideBar2';

const NavBar = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey='home'
        id='uncontrolled-tab-example'
        className='d-flex justify-content-center'
      >
        <Tab eventKey='home' title='PROFILES'>
          <Sidebar1 />
        </Tab>
        <Tab eventKey='management' title='MANAGEMENT'>
          <Sidebar2 />
        </Tab>
      </Tabs>
    </div>
  );
};

export default NavBar;
