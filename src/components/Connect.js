import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Facebook from '../profiles/Facebook';
import Google from '../profiles/Google';
import Instagram from '../profiles/Instagram';
import Yelp from '../profiles/Yelp';
import InputModal from './InputModal';

const Connect = ({
  fbLogin,
  setFbLogin,
  instaLogin,
  setInstaLogin,
  content,
  setContent,
}) => {
  return (
    <Container className='mt-5'>
      <InputModal
        fbLogin={fbLogin}
        instaLogin={instaLogin}
        content={content}
        setContent={setContent}
      />
      <Row>
        <Facebook login={fbLogin} setLogin={setFbLogin} />
        <Instagram login={instaLogin} setLogin={setInstaLogin} />
        <Google />
        <Yelp />
      </Row>
    </Container>
  );
};

export default Connect;
