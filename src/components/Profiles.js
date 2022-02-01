import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Facebook from '../profiles/Facebook';
import Google from '../profiles/Google';
import Instagram from '../profiles/Instagram';
import Yelp from '../profiles/Yelp';

const Profiles = () => {
  return (
    <Container className='mt-5'>
      <Row>
        <Facebook />
        <Instagram />
        <Google />
        <Yelp />
      </Row>
    </Container>
  );
};

export default Profiles;
