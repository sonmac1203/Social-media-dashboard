import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Profile from './Profile';

const Profiles = () => {
  return (
    <Container>
      <Row>
        <Profile name='Facebook' iconName='fab fa-facebook-square' />
        <Profile name='Instagram' iconName='fab fa-instagram' />
        <Profile name='Google Business' iconName='fas fa-user-tie' />
        <Profile name='Yelp' iconName='fab fa-yelp' />
      </Row>
    </Container>
  );
};

export default Profiles;