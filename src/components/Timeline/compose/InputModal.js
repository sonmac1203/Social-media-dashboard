import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Modal,
  DropdownButton,
  Dropdown,
  Row,
  Badge,
} from 'react-bootstrap';
import axios from 'axios';
import MediaUpload from './MediaUpload';

const InputModal = ({ profiles }) => {
  const [content, setContent] = useState('');
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [fakeImageUrl, setFakeImageUrl] = useState('');
  const [rows, setRows] = useState(5);
  const [progress, setProgress] = useState(0);
  const [chosenIndices, setChosenIndices] = useState([]);

  const handleClose = () => {
    setShow(false);
    setImageUrl('');
    setFakeImageUrl('');
    setChosenIndices([]);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    if (imageUrl || fakeImageUrl) {
      setRows(7);
    } else {
      setRows(5);
    }
  }, [imageUrl, fakeImageUrl]);

  const postContent = async () => {
    for (let i = 0; i < chosenIndices.length; i++) {
      const profile = profiles[i];
      if (profiles[i].type === 'facebook') {
        const url = `https://graph.facebook.com/${profile.page_id}/${
          imageUrl ? 'photos' : 'feed'
        }`;
        const params = {
          params: {
            url: imageUrl,
            message: content,
            access_token: profile.page_token,
          },
        };
        await axios.post(url, null, params);
        alert('FACEBOOK UPLOAD SUCCESS!!!');
      } else if (profiles[i].type === 'instagram') {
        let url = `https://graph.facebook.com/v12.0/${profile.page_id}/media`;
        let params = {
          params: {
            image_url: imageUrl,
            caption: content,
            access_token: profile.access_token,
          },
        };
        const firstResponse = await axios.post(url, null, params);

        url = `https://graph.facebook.com/${profile.page_id}/media_publish`;
        params = {
          params: {
            creation_id: firstResponse.data.id,
            access_token: profile.access_token,
          },
        };
        await axios.post(url, null, params);
        alert('INSTAGRAM UPLOAD SUCCESS!!!');
      }
    }
    handleClose();
  };

  return (
    <Row className='input-row'>
      <h3>Let's make a post!</h3>
      <button onClick={handleShow} className='mb-5 post-btn'>
        What are you posting today?
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        size='md'
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className='input-modal-title ms-2'>
            Make a new post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-2'>
            {chosenIndices.map((index, key) => (
              <Badge className='selected-profile-badge'>
                <img
                  src={profiles[index].profile_picture_url}
                  className='selected-profile-picture'
                />
                {profiles[index].name}
                <i
                  className='fas fa-times'
                  onClick={() => {
                    setChosenIndices(chosenIndices.filter((i) => i !== index));
                  }}
                ></i>
              </Badge>
            ))}
          </div>
          <div className='compose-input'>
            <Form>
              <Form.Group controlId='update-form'>
                <Form.Control
                  as='textarea'
                  placeholder='Type your post here ...'
                  rows={rows}
                  autoFocus
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
            </Form>
            {fakeImageUrl && !imageUrl && (
              <div className='compose-input-fake-photo'>
                <p>{progress} %</p>
                <img src={fakeImageUrl} alt='uploaded' height='110px' />
              </div>
            )}
            {imageUrl && (
              <img
                className='compose-input-photo'
                src={imageUrl}
                alt='uploaded'
                height='110px'
              />
            )}
            <MediaUpload
              setImageUrl={setImageUrl}
              setFakeImageUrl={setFakeImageUrl}
              fakeImageUrl={fakeImageUrl}
              setProgress={setProgress}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <DropdownButton
            id='dropdown-basic-button'
            title='Select a profile'
            autoClose={false}
          >
            {profiles.map((profile, key) => (
              <Dropdown.Item
                className='d-flex justify-content-between align-items-center'
                key={key}
                onClick={() => {
                  if (!chosenIndices.includes(key)) {
                    setChosenIndices([...chosenIndices, key]);
                  }
                }}
              >
                <div className='d-flex align-items-center'>
                  {profile.type === 'facebook' ? (
                    <i className='fab fa-facebook-square me-2 drop-down-icon'></i>
                  ) : (
                    <i className='fab fa-instagram me-2 drop-down-icon'></i>
                  )}
                  <strong>{profile.name}</strong>
                </div>
              </Dropdown.Item>
            ))}
            {profiles.length === 0 && (
              <Dropdown.Item disabled>Not found</Dropdown.Item>
            )}
          </DropdownButton>
          <Button variant='primary' onClick={() => postContent()}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default InputModal;
