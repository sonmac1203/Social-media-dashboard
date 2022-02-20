import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Login/contexts/AuthContext';
import { Col, Card, Row } from 'react-bootstrap';
import { database } from '../../firebase/firebase';
import {
  ref,
  query,
  onValue,
  equalTo,
  orderByKey,
  child,
} from 'firebase/database';
import ConnectedProfile from './ConnectedProfile';

export const Profile = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const userRef = ref(database, 'users');
    onValue(
      query(userRef, orderByKey(), equalTo(currentUser.uid)),
      (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((item) => {
            setUser(item.val());
          });
        }
      }
    );

    const profileRef = child(
      child(ref(database, 'users'), currentUser.uid),
      'profiles_connected'
    );
    onValue(profileRef, (snapshot) => {
      const profileList = [];
      if (snapshot.exists()) {
        snapshot.forEach((item) => {
          profileList.push(item.val());
        });
        setProfiles(profileList);
      }
    });
  }, []);

  return (
    user && (
      <Col lg={{ span: 4, offset: 4 }}>
        <Row className='mt-4'>
          <Card>
            <Card.Body>
              <div className='d-flex justify-content-center mb-2 mt-3'>
                <img
                  src={user.avatar_url}
                  alt='profile avatar'
                  className='profile-avatar'
                />
              </div>
              <div className='d-flex justify-content-center'>
                <h2>{user.name}</h2>
              </div>
              <div className='d-flex justify-content-center mb-2'>
                <h6>{user.email}</h6>
              </div>
            </Card.Body>
          </Card>
        </Row>
        {profiles &&
          profiles.map((profile, key) => (
            <ConnectedProfile profile={profile} key={key} />
          ))}
      </Col>
    )
  );
};
