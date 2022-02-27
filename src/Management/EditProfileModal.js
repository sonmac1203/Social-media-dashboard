import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import MediaUpload from '../Timeline/MediaUpload';
import { database } from '../firebase/firebase';
import { ref, child, update } from 'firebase/database';
import { useAuth } from '../Login/AuthContext';

const EditProfileModal = ({ user, show, setShow }) => {
  const { currentUser } = useAuth();
  const [imageUrl, setImageUrl] = useState('');
  const [fakeImageUrl, setFakeImageUrl] = useState('');
  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const handleShowMediaUpload = () => setShowMediaUpload(true);
  const [progress, setProgress] = useState(0);
  const [newName, setNewName] = useState('');

  const handleClose = () => {
    setShow(false);
    setImageUrl('');
    setFakeImageUrl('');
  };

  const handleSave = () => {
    const userRef = ref(database, 'users');
    if (imageUrl) {
      update(child(userRef, currentUser.uid), {
        avatar_url: imageUrl,
      });
    }
    if (newName) {
      update(child(userRef, currentUser.uid), {
        name: newName,
      });
    }
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Body>
          <div className='d-flex justify-content-center mb-2 mt-2'>
            <img
              src={
                imageUrl
                  ? imageUrl
                  : fakeImageUrl
                  ? fakeImageUrl
                  : user.avatar_url
              }
              alt='profile avatar'
              className='profile-avatar-edit'
              style={fakeImageUrl && !imageUrl ? { opacity: '50%' } : {}}
            />
          </div>
          {fakeImageUrl && !imageUrl && (
            <div className='d-flex justify-content-center'>{progress} %</div>
          )}
          <div className='d-flex justify-content-center mt-3'>
            <Button
              variant='outline-secondary text-center'
              onClick={handleShowMediaUpload}
            >
              <i className='fas fa-upload me-2' style={{ fontSize: 20 }}></i>
              Upload
            </Button>
          </div>
          <Form>
            <Form.Group className='mb-3' controlId='edit-username-form'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                defaultValue={user.name}
                onChange={(e) => setNewName(e.target.value)}
              />
              <Form.Text className='text-muted'>
                Please type a new display name above to edit.
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3' controlId='edit-email-form'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='text' defaultValue={user.email} disabled />
              <Form.Text className='text-muted'>
                We currently do not support changing email.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={handleSave}
            disabled={(!newName || newName === user.name) && !imageUrl}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <MediaUpload
        show={showMediaUpload}
        setShow={setShowMediaUpload}
        setImageUrl={setImageUrl}
        setFakeImageUrl={setFakeImageUrl}
        fakeImageUrl={fakeImageUrl}
        setProgress={setProgress}
      />
    </>
  );
};

export default EditProfileModal;
