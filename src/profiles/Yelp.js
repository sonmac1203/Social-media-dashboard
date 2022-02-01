import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

const Yelp = () => {
  return (
    <Col xl='3'>
      <Card style={{ width: '260px' }}>
        <Card.Body>
          <Card.Title>
            <div>
              <i className='fab fa-yelp mb-2' />
            </div>
            <div>Yelp</div>
          </Card.Title>
          <Card.Text>Connect to your Yelp profile</Card.Text>
          <Button>Add</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Yelp;
