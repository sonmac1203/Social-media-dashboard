import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

const Instagram = () => {
  return (
    <Col xl='3'>
      <Card style={{ width: '260px' }}>
        <Card.Body>
          <Card.Title>
            <div>
              <i className='fab fa-instagram mb-2' />
            </div>
            <div>Instagram</div>
          </Card.Title>
          <Card.Text>Connect to your Instagram profile</Card.Text>
          <Button>Add</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Instagram;
