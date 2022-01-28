import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

const Profile = ({ name, iconName }) => {
  return (
    <Col xl='3'>
      <Card style={{ width: '260px' }}>
        <Card.Body>
          <Card.Title>
            <div>
              <i className={`${iconName} mb-2`} />
            </div>
            <div>{name}</div>
          </Card.Title>
          <Card.Text>Connect to your {name} profile</Card.Text>
          <Button variant='primary'>Add</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Profile;
