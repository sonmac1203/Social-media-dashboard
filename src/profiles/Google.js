import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

const Google = () => {
  return (
    <Col xl='3'>
      <Card style={{ width: '260px' }}>
        <Card.Body>
          <Card.Title>
            <div>
              <i className='fas fa-user-tie mb-2' />
            </div>
            <div>Google My Business</div>
          </Card.Title>
          <Card.Text>Connect to your Google My Business profile</Card.Text>
          <Button>Add</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Google;
