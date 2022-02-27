import React, { useState } from 'react';
import { Row, Badge, Modal, Button } from 'react-bootstrap';
import { useAuth } from '../Login/AuthContext';
import { database } from '../firebase/firebase';
import { ref, onValue, child, set } from 'firebase/database';

const ConnectedProfile = ({ profile }) => {
  const [show, setShow] = useState(false);
  const { currentUser } = useAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleDelete = (id) => {
    const profileRef = child(
      child(ref(database, 'users'), currentUser.uid),
      'profiles_connected'
    );
    onValue(profileRef, (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((item) => {
          if (item.val().page_id === id) {
            if (Object.keys(snapshot.val()).length > 1) {
              set(child(profileRef, item.key), null);
            } else {
              set(profileRef, '');
            }
          }
        });
      }
    });
    handleClose();
  };

  return (
    <Row className='profile-row mb-4 py-3'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex'>
          <img
            src={profile.profile_picture_url}
            alt='profile avatar'
            className='profile-connected-avatar'
          />
          <div className='ms-3'>
            <strong>{profile.name}</strong>
            <div className='mt-1'>
              <Badge
                className={`${
                  profile.type === 'facebook'
                    ? 'fb'
                    : profile.type === 'instagram'
                    ? 'insta'
                    : ''
                }-badge`}
              >
                {profile.type === 'facebook'
                  ? '#facebook-page'
                  : profile.type === 'instagram'
                  ? '#instagram-business'
                  : ''}
              </Badge>
            </div>
          </div>
        </div>
        <div>
          <i
            className='fas fa-trash ms-3'
            style={{ fontSize: '20px', cursor: 'pointer' }}
            onClick={handleShow}
          ></i>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        size='sm'
        centered
      >
        <Modal.Body>Deleting this profile?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            No
          </Button>
          <Button
            variant='primary'
            onClick={() => handleDelete(profile.page_id)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default ConnectedProfile;
