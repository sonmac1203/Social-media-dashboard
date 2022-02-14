import React from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import Posts from './Posts';

const SideBar2 = () => {
  return (
    <div>
      <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
        <Row>
          <Col sm='2' className='tab-column'>
            <Nav variant='pills' className='flex-column'>
              <Nav.Item>
                <Nav.Link eventKey='first'>Facebook</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='second'>Instagram</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm='10'>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <Posts />
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
