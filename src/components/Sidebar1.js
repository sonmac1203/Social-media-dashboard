import React, { useState } from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import Connect from './Connect';

const Sidebar = () => {
  const [fbData, setFbData] = useState({
    login: false,
    shortToken: '',
    userID: '',
    pageLongToken: '',
    pageID: '',
  });

  const [instaData, setInstaData] = useState({
    login: false,
    userToken: '',
    pageID: '',
  });

  const [content, setContent] = useState('');

  const props = {
    fb: fbData,
    setFb: setFbData,
    insta: instaData,
    setInsta: setInstaData,
    content: content,
    setContent: setContent,
  };

  return (
    <div>
      <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
        <Row>
          <Col sm='2' className='tab-column'>
            <Nav variant='pills' className='flex-column'>
              <Nav.Item>
                <Nav.Link eventKey='first'>Connect</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='second'>Profiles</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm='10'>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <Connect {...props} />
              </Tab.Pane>
              <Tab.Pane eventKey='second'>
                <h2>HIHIHI</h2>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Sidebar;
