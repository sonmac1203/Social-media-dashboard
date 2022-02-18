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
import { database } from '../../../firebase/firebase';
import { ref, child, get, push, onChildAdded } from 'firebase/database';
import { DateTime } from 'luxon';

const InputModal = ({ fbLogin, instaLogin }) => {
  const [content, setContent] = useState('');
  const [show, setShow] = useState(false);
  const [fbChosen, setFbChosen] = useState(false);
  const [instaChosen, setInstaChosen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [fakeImageUrl, setFakeImageUrl] = useState('');
  const [rows, setRows] = useState(5);
  const [progress, setProgress] = useState(0);
  const [fbPosted, setFbPosted] = useState(false);
  const [instaPosted, setInstaPosted] = useState(false);
  const [fbName, setFbName] = useState(null);
  const [instaName, setInstaName] = useState(null);
  const [fbImage, setFbImage] = useState(null);
  const [instaImage, setInstaImage] = useState(null);
  const [pageFbPostId, setPageFbPostId] = useState('');
  const [pageInstaPostId, setPageInstaPostId] = useState('');

  const handleClose = () => {
    setShow(false);
    setImageUrl('');
    setFakeImageUrl('');
    setFbChosen(false);
    setInstaChosen(false);
  };
  const handleShow = () => {
    setShow(true);
    setFbPosted(false);
    setInstaPosted(false);
  };

  const toggleInsta = () => {
    setInstaChosen(!instaChosen);
  };

  const toggleFb = () => {
    setFbChosen(!fbChosen);
  };

  useEffect(() => {
    if (imageUrl || fakeImageUrl) {
      setRows(7);
    } else {
      setRows(5);
    }
  }, [imageUrl, fakeImageUrl]);

  const postContent = () => {
    if (fbLogin && fbChosen) {
      const dbRef = ref(database);
      get(child(dbRef, 'facebook'))
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const url = `https://graph.facebook.com/${data.page_id}/${
              imageUrl ? 'photos' : 'feed'
            }`;
            const params = {
              params: {
                url: imageUrl,
                message: content,
                access_token: data.page_token,
              },
            };
            const postResponse = await axios.post(url, null, params);
            setPageFbPostId(
              imageUrl.length > 0
                ? postResponse.data.post_id
                : postResponse.data.id
            );
            alert('FACEBOOK UPLOAD SUCCESS!!!');
            setFbPosted(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (instaLogin && instaChosen) {
      const dbRef = ref(database);
      get(child(dbRef, `instagram`))
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            let url = `https://graph.facebook.com/v12.0/${data.page_id}/media`;
            let params = {
              params: {
                image_url: imageUrl,
                caption: content,
                access_token: data.access_token,
              },
            };
            const firstResponse = await axios.post(url, null, params);

            url = `https://graph.facebook.com/${data.page_id}/media_publish`;
            params = {
              params: {
                creation_id: firstResponse.data.id,
                access_token: data.access_token,
              },
            };
            const postResponse = await axios.post(url, null, params);
            setPageInstaPostId(postResponse.data.id);
            alert('INSTAGRAM UPLOAD SUCCESS!!!');
            setInstaPosted(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    onChildAdded(ref(database), (data) => {
      if (data.key === 'facebook') {
        setFbName(data.val().name);
        setFbImage(data.val().profile_picture_url);
      }
      if (data.key === 'instagram') {
        setInstaName(data.val().name);
        setInstaImage(data.val().profile_picture_url);
      }
    });
  }, []);

  useEffect(() => {
    if (
      (fbChosen && instaChosen && fbPosted && instaPosted) ||
      (fbChosen && !instaChosen && fbPosted) ||
      (!fbChosen && instaChosen && instaPosted)
    ) {
      const post = {
        facebook_posted: fbChosen,
        instagram_posted: instaChosen,
        content: content,
        image: imageUrl,
        time: DateTime.now().toMillis() * -1,
        facebook_post_id: pageFbPostId,
        instagram_post_id: pageInstaPostId,
      };
      push(child(ref(database), 'posts'), post);
      setPageFbPostId('');
      setPageInstaPostId('');
      handleClose();
    }
  }, [fbPosted, instaPosted]);

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
            {fbChosen && (
              <Badge className='selected-profile-badge'>
                <img src={fbImage} className='selected-profile-picture' />
                {fbName}
                <i className='fas fa-times' onClick={toggleFb}></i>
              </Badge>
            )}
            {instaChosen && (
              <Badge className='selected-profile-badge'>
                <img src={instaImage} className='selected-profile-picture' />
                {instaName}
                <i className='fas fa-times' onClick={toggleInsta}></i>
              </Badge>
            )}
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
            {!fbLogin && !instaLogin && (
              <Dropdown.Item disabled>Not found</Dropdown.Item>
            )}
            {fbLogin && (
              <Dropdown.Item
                onClick={toggleFb}
                className='d-flex justify-content-between align-items-center'
              >
                <div className='d-flex align-items-center'>
                  <i className='fab fa-facebook-square me-2 drop-down-icon'></i>
                  <strong>{fbName}</strong>
                </div>
                {fbChosen && <i className='fas fa-check ms-2'></i>}
              </Dropdown.Item>
            )}
            {instaLogin && (
              <Dropdown.Item
                onClick={toggleInsta}
                className='d-flex justify-content-between align-items-center'
              >
                <div className='d-flex align-items-center'>
                  <i className='fab fa-instagram me-2 drop-down-icon'></i>
                  <strong>{instaName}</strong>
                </div>
                {instaChosen && <i className='fas fa-check'></i>}
              </Dropdown.Item>
            )}
          </DropdownButton>
          <Button
            variant='primary'
            onClick={() => postContent()}
            disabled={(instaChosen && !imageUrl) || (!fbChosen && !instaChosen)}
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default InputModal;
