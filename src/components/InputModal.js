import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import MediaUpload from './MediaUpload';
import { database } from '../firebase/firebase';
import { ref, child, get, push } from 'firebase/database';
import { DateTime } from 'luxon';

const InputModal = ({ fbLogin, instaLogin, content, setContent }) => {
  const [show, setShow] = useState(false);

  const [fbChosen, setFbChosen] = useState(false);

  const [instaChosen, setInstaChosen] = useState(false);

  const [imageUrl, setImageUrl] = useState('');

  const [fakeImageUrl, setFakeImageUrl] = useState('');

  const [rows, setRows] = useState(5);

  const [progress, setProgress] = useState(0);

  const [posted, setPosted] = useState(false);

  const handleClose = () => {
    setShow(false);
    setImageUrl('');
    setFakeImageUrl('');
    setFbChosen(false);
    setInstaChosen(false);
  };
  const handleShow = () => {
    setShow(true);
    setPosted(false);
  };

  const toggleInsta = () => {
    setInstaChosen(!instaChosen);
  };

  const toggleFb = () => {
    setFbChosen(!fbChosen);
  };

  useEffect(() => {
    if (imageUrl || fakeImageUrl) {
      setRows(8);
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
            const url = `https://graph.facebook.com/${data.pageId}/${
              imageUrl ? 'photos' : 'feed'
            }`;
            const params = {
              params: {
                url: `${imageUrl ? imageUrl : ''}`,
                message: content,
                access_token: data.pageLongToken,
              },
            };
            await axios.post(url, null, params);
            alert('FACEBOOK UPLOAD SUCCESS!!!');
            setPosted(true);
            setShow(false);
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
            let url = `https://graph.facebook.com/v12.0/${data.pageId}/media`;
            let params = {
              params: {
                image_url: imageUrl,
                caption: content,
                access_token: data.userToken,
              },
            };
            const firstResponse = await axios.post(url, null, params);

            url = `https://graph.facebook.com/${data.pageId}/media_publish`;
            params = {
              params: {
                creation_id: firstResponse.data.id,
                access_token: data.userToken,
              },
            };
            await axios.post(url, null, params);
            alert('INSTAGRAM UPLOAD SUCCESS!!!');
            setPosted(true);
            setShow(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (posted) {
      const post = {
        facebook_posted: fbChosen,
        insta_posted: instaChosen,
        content: content,
        image: imageUrl,
        time: DateTime.now().toMillis() * -1,
      };
      push(child(ref(database), 'posts'), post);
    }
  }, [posted]);

  return (
    <div>
      <Button variant='primary' onClick={handleShow} className='mb-5'>
        COMPOSE
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Let's make a post!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-2'>
            {fbChosen && <i className='fab fa-facebook me-2'></i>}
            {instaChosen && <i className='fab fa-instagram me-2'></i>}
          </div>
          <div className='compose-input'>
            <Form>
              <Form.Group className='mb-3' controlId='testform'>
                <Form.Control
                  as='textarea'
                  placeholder='Enter your content'
                  rows={rows}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
            </Form>
            {fakeImageUrl && !imageUrl && (
              <div className='compose-input-fake-photo'>
                <p>{progress} %</p>
                <img src={fakeImageUrl} alt='uploaded' height='85px' />
              </div>
            )}
            {imageUrl && (
              <img
                className='compose-input-photo'
                src={imageUrl}
                alt='uploaded'
                height='85px'
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
          <DropdownButton id='dropdown-basic-button' title='Choose a profile'>
            {!fbLogin && !instaLogin && (
              <Dropdown.Item disabled>Not found</Dropdown.Item>
            )}
            {fbLogin && (
              <Dropdown.Item
                onClick={toggleFb}
                className='d-flex justify-content-between align-items-center'
              >
                Facebook
                {fbChosen && <i className='fas fa-check'></i>}
              </Dropdown.Item>
            )}
            {instaLogin && (
              <Dropdown.Item
                onClick={toggleInsta}
                className='d-flex justify-content-between align-items-center'
              >
                Instagram
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
    </div>
  );
};

export default InputModal;
