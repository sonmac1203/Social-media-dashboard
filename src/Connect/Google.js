import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

const Google = () => {
  return (
    <Col md='6' lg={{ span: 6, offset: 3 }}>
      <Card className='connect-row'>
        <Card.Body>
          <Card.Title>
            <div>
              <i className='fas fa-user-tie mb-2' />
            </div>
            <div>Google My Business</div>
          </Card.Title>
          <Card.Text>Connect to your Google My Business profile</Card.Text>
          <Button>Connect</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Google;
