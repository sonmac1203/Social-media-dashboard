import React from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import Manage from './Manage';

const SideBar2 = () => {
  return (
    <div>
      <Tab.Container id='left-tabs-example' defaultActiveKey='timeline'>
        <Row>
          <Col sm='2' className='tab-column'>
            <Nav variant='pills' className='flex-column'>
              <Nav.Item>
                <Nav.Link eventKey='timeline'>Timeline</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='fb'>Facebook</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='insta'>Instagram</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm='10'>
            <Manage />
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default SideBar2;
