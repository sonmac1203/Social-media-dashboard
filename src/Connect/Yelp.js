import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

const Yelp = () => {
  return (
    <Col md='6' lg={{ span: 6, offset: 3 }}>
      <Card className='connect-row'>
        <Card.Body>
          <Card.Title>
            <div>
              <i className='fab fa-yelp mb-2' />
            </div>
            <div>Yelp</div>
          </Card.Title>
          <Card.Text>Connect to your Yelp profile</Card.Text>
          <Button>Connect</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Yelp;
