import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Facebook from '../profiles/Facebook';
import Google from '../profiles/Google';
import Instagram from '../profiles/Instagram';
import Yelp from '../profiles/Yelp';
import InputModal from './InputModal';
import { database } from '../firebase/firebase';
import {
  ref,
  child,
  get,
  onChildAdded,
  query,
  orderByChild,
} from 'firebase/database';

const Connect = () => {
  const [fbLogin, setFbLogin] = useState(false);
  const [instaLogin, setInstaLogin] = useState(false);
  const [content, setContent] = useState('');
  const dbRef = ref(database);

  const checkLoginState = (media) => {
    get(child(dbRef, media))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (media === 'facebook') {
            if (data.shortToken) {
              setFbLogin(true);
            } else {
              setFbLogin(false);
            }
          } else if (media === 'instagram') {
            if (data.userToken) {
              setInstaLogin(true);
            } else {
              setInstaLogin(false);
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    checkLoginState('facebook');
    checkLoginState('instagram');
  }, []);

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
