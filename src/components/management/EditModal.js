import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { DateTime } from 'luxon';
import axios from 'axios';
import { database } from '../../firebase/firebase';
import {
  equalTo,
  orderByChild,
  child,
  ref,
  query,
  onValue,
  set,
  push,
} from 'firebase/database';

const EditModal = ({
  show,
  setShow,
  post: { content, time, facebook_post_id, image },
  name,
  pageToken,
  imageUrl,
}) => {
  const [newContent, setNewContent] = useState('');

  const handleClose = () => {
    setShow(false);
    setNewContent('');
  };

  const handleUpdate = async () => {
    const postRef = ref(database, 'posts');
    const url = `https://graph.facebook.com/${facebook_post_id}`;
    const params = {
      params: {
        message: newContent,
        access_token: pageToken,
      },
    };
    await axios.post(url, null, params);
    onValue(
      query(
        postRef,
        orderByChild('facebook_post_id'),
        equalTo(facebook_post_id)
      ),
      (snapshot) => {
        snapshot.forEach((post) => {
          if (!post.val().instagram_posted) {
            set(child(post.ref, 'content'), newContent);
          } else {
            set(child(post.ref, 'facebook_posted'), false);
            set(child(post.ref, 'facebook_post_id'), '');
          }
        });
      }
    );
    console.log('Im pushing the second time guys!!!');
    const editedPost = {
      facebook_posted: true,
      instagram_posted: false,
      content: newContent,
      image: image,
      time: time,
      facebook_post_id: facebook_post_id,
      instagram_post_id: '',
    };
    push(child(ref(database), 'posts'), editedPost);
    alert('FACEBOOK UPDATE SUCCESS!!!');
    setShow(false);
  };

  return (
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
  );
};

export default EditModal;
