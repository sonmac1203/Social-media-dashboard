import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Profiles from './Profiles';

const NavBar = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey='profile'
        id='uncontrolled-tab-example'
        className='mb-3'
      >
        <Tab eventKey='home' title='Profiles'>
          <Profiles />
        </Tab>
        <Tab eventKey='profile' title='Posts'>
          <h1>HIHIHI</h1>
        </Tab>
        <Tab eventKey='contact' title='Contact' disabled>
          <h1>HUHUHU</h1>
        </Tab>
      </Tabs>
    </div>
  );
};

export default NavBar;
