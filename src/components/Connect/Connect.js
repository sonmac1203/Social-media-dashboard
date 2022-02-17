import React from 'react';
import { Row } from 'react-bootstrap';
import Facebook from './profiles/Facebook';
import Google from './profiles/Google';
import Instagram from './profiles/Instagram';
import Yelp from './profiles/Yelp';

const Connect = ({ fbLogin, instaLogin }) => {
  return (
    <div className='mt-4'>
      <Row>
        <Facebook login={fbLogin} />
        <Instagram login={instaLogin} />
        <Google />
        <Yelp />
      </Row>
    </div>
  );
};

export default Connect;
