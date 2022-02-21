import React from 'react';
import { Row } from 'react-bootstrap';
import Facebook from './Facebook';
import Google from './Google';
import Instagram from './Instagram';
import Yelp from './Yelp';

const Connect = ({ fbLogin, instaLogin }) => {
  return (
    <Row className='mt-4'>
      <Facebook login={fbLogin} />
      <Instagram login={instaLogin} />
      <Google />
      <Yelp />
    </Row>
  );
};

export default Connect;
