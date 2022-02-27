import React from 'react';
import { Row } from 'react-bootstrap';
import Facebook from './Facebook';
import Google from './Google';
import Instagram from './Instagram';
import Yelp from './Yelp';

const Connect = () => {
  return (
    <Row className='mt-4'>
      <Facebook />
      <Instagram />
      <Google />
      <Yelp />
    </Row>
  );
};

export default Connect;
