import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Facebook from '../profiles/Facebook';
import Google from '../profiles/Google';
import Instagram from '../profiles/Instagram';
import Yelp from '../profiles/Yelp';
import InputModal from './InputModal';

const Connect = ({ fb, setFb, insta, setInsta, content, setContent }) => {
  return (
    <Container className='mt-5'>
      <Row>
        <Facebook fb={fb} setFb={setFb} />
        <Instagram insta={insta} setInsta={setInsta} />
        <Google />
        <Yelp />
      </Row>
      <InputModal
        fb={fb}
        insta={insta}
        content={content}
        setContent={setContent}
      />
    </Container>
  );
};

export default Connect;
