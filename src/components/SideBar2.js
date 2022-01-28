import React from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';

const SideBar2 = () => {
  return (
    <div>
      <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
        <Row>
          <Col sm='2' className='tab-column'>
            <Nav variant='pills' className='flex-column'>
              <Nav.Item>
                <Nav.Link eventKey='first'>Your posts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='second'>Profiles</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='third'>Compose</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm='10'>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <h1>HAHAHA</h1>
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

export default SideBar2;
