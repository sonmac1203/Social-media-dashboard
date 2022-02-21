import React, { useState, useEffect } from 'react';
import { useAuth } from '../Login/AuthContext';
import { Col, Card, Row, Button } from 'react-bootstrap';
import { database } from '../firebase/firebase';
import { ref, onValue, child } from 'firebase/database';
import ConnectedProfile from './ConnectedProfile';
import EditProfileModal from './EditProfileModal';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [profiles, setProfiles] = useState(null);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const userRef = ref(database, 'users');
    onValue(child(userRef, currentUser.uid), (user) => {
      setUser(user.val());
    });

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
              <div className='d-flex justify-content-center mb-2'>
                <i className='fas fa-user-edit' onClick={handleShow}></i>
              </div>
              <EditProfileModal user={user} show={show} setShow={setShow} />
            </Card.Body>
          </Card>
        </Row>
        {profiles &&
          profiles.map((profile, key) => (
            <ConnectedProfile profile={profile} key={key} />
          ))}
        {profiles && (
          <div className='d-flex justify-content-center mb-2'>
            <h6>
              {profiles.length} connected
              {profiles.length > 1 ? ' profiles' : ' profile'}
            </h6>
          </div>
        )}
        {!profiles && (
          <div className='d-flex justify-content-center mb-3'>
            <Link to='/connect'>
              <Button>GET STARTED</Button>
            </Link>
          </div>
        )}
      </Col>
    )
  );
};
