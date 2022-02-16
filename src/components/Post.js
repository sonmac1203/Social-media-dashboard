import React, { useState } from 'react';
import { Row, Container, Badge, Form, Button, Modal } from 'react-bootstrap';
import { DateTime } from 'luxon';
import axios from 'axios';
import { database } from '../firebase/firebase';
import {
  equalTo,
  orderByChild,
  child,
  ref,
  query,
  onValue,
  set,
  update,
} from 'firebase/database';

const Post = ({
  post: { content, image, time, facebook_posted, instagram_posted, id },
  imageUrl,
  name,
  pageToken,
}) => {
  const [newContent, setNewContent] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setNewContent('');
  };
  const handleShow = () => setShow(true);

  const handleUpdate = async () => {
    const postRef = ref(database, 'posts');
    console.log(newContent);
    const url = `https://graph.facebook.com/${id}`;
    const params = {
      params: {
        message: newContent,
        access_token: pageToken,
      },
    };
    console.log(id);
    console.log(pageToken);
    await axios.post(url, null, params);
    onValue(query(postRef, orderByChild('id'), equalTo(id)), (snapshot) => {
      snapshot.forEach((post) => {
        console.log(post.val());
        set(child(post.ref, 'content'), newContent);
      });
    });
    alert('FACEBOOK UPDATE SUCCESS!!!');
    setShow(false);
  };

  return (
    <Container className='mt-4'>
      <Row className='mb-5 border ps-2 pt-2'>
        {imageUrl && name ? (
          <div className='d-flex justify-content-between'>
            <div className='d-flex justify-content-start mt-3 mb-2'>
              <img
                src={imageUrl}
                alt='page-avatar'
                className='facebook-post-avatar'
              />
              <div className='ms-3'>
                <strong>{name}</strong>
                <h6 className='facebook-post-time-stamp'>{`Posted at ${DateTime.fromMillis(
                  time * -1
                ).toFormat('ff')}`}</h6>
              </div>
            </div>
            <div className='me-3 mt-3 facebook-post-functions'>
              {pageToken && (
                <i className='fas fa-edit' onClick={handleShow}></i>
              )}
              <i className='fas fa-trash ms-3'></i>
            </div>
          </div>
        ) : (
          <h6 className='facebook-post-time-stamp mt-2'>{`Posted at ${DateTime.fromMillis(
            time * -1
          ).toFormat('ff')}`}</h6>
        )}
        <div>
          <p className='post-content'>{content}</p>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            keyboard={false}
            animation={false}
          >
            <Modal.Header>
              <Modal.Title className='d-flex justify-content-start'>
                <img
                  src={imageUrl}
                  alt='page-avatar'
                  className='facebook-post-avatar'
                />
                <div className='ms-3'>
                  <strong>{name}</strong>
                  <h6 className='facebook-post-time-stamp'>{`Posted at ${DateTime.fromMillis(
                    time * -1
                  ).toFormat('ff')}`}</h6>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className='update-form'>
                <Form.Group>
                  <Form.Control
                    as='textarea'
                    rows='4'
                    autoFocus
                    defaultValue={content}
                    onChange={(e) => setNewContent(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button
                variant='primary'
                disabled={newContent === ''}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {image && (
          <img
            src={image}
            alt='image uploaded with this post'
            className='facebook-post-image mb-4'
          />
        )}
        {!imageUrl && !name && (
          <div className='d-flex justify-content-start mb-3'>
            {facebook_posted && <Badge className='me-3'>Facebook</Badge>}
            {instagram_posted && <Badge className='me-3'>Instagram</Badge>}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Post;
