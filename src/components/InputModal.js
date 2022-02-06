import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import MediaUpload from './MediaUpload';

const InputModal = ({ fb, insta, content, setContent }) => {
  const { pageID: fbPageID, pageLongToken, login: fbLogin } = fb;
  const { pageID: instaPageID, userToken, login: instaLogin } = insta;

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setImageUrl('');
  };
  const handleShow = () => setShow(true);

  const [instaChosen, setInstaChosen] = useState(false);
  const [fbChosen, setFbChosen] = useState(false);

  const [imageUrl, setImageUrl] = useState('');

  const [rows, setRows] = useState(5);

  const toggleInsta = () => {
    setInstaChosen(!instaChosen);
  };

  const toggleFb = () => {
    setFbChosen(!fbChosen);
  };

  useEffect(() => {
    if (imageUrl) {
      setRows(9);
      console.log(imageUrl);
    } else {
      setRows(5);
    }
  }, [imageUrl]);

  const postContent = async () => {
    if (fbLogin && fbChosen) {
      axios
        .post(
          `https://graph.facebook.com/${fbPageID}/${
            imageUrl ? 'photos' : 'feed'
          }`,
          null,
          {
            params: {
              url: `${imageUrl ? imageUrl : ''}`,
              message: content,
              access_token: pageLongToken,
            },
          }
        )
        .then(() => {
          alert('FACEBOOK UPLOAD SUCCESS!!!');
        });
    }
    if (instaLogin && instaChosen) {
      const firstResponse = await axios.post(
        `https://graph.facebook.com/v12.0/${instaPageID}/media`,
        null,
        {
          params: {
            image_url:
              'https://www.sonmac.me/static/media/zendesk.05cc2e8250df4a92ea6c.jpg',
            caption: content,
            access_token: userToken,
          },
        }
      );

      await axios
        .post(`https://graph.facebook.com/${instaPageID}/media_publish`, null, {
          params: {
            creation_id: firstResponse.data.id,
            access_token: userToken,
          },
        })
        .then(() => {
          alert('INSTAGRAM UPLOAD SUCCESS!!!');
        });
    }
  };

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
            {imageUrl && <img className='compose-input-photo' src={imageUrl} />}
            <MediaUpload setImageUrl={setImageUrl} />
          </div>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <DropdownButton id='dropdown-basic-button' title='Choose a profile'>
            {!fbLogin && !instaLogin && (
              <Dropdown.Item disabled>Not found</Dropdown.Item>
            )}
            {fbLogin && (
              <Dropdown.Item onClick={toggleFb}>Facebook</Dropdown.Item>
            )}
            {instaLogin && (
              <Dropdown.Item onClick={toggleInsta}>Instagram</Dropdown.Item>
            )}
          </DropdownButton>
          <Button variant='primary' onClick={() => postContent()}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InputModal;
