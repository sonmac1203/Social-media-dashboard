import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

const Profile = ({ name, iconName }) => {
  return (
    <Col xl='3'>
      <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
        <Card.Body>
          <Card.Title>
            <div>
              <i className={`${iconName} mb-2`} />
            </div>
            <div>{name}</div>
          </Card.Title>
          <Card.Text>Connect to your {name} profile</Card.Text>
          <Button variant='primary'>Add Profile</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Profile;
