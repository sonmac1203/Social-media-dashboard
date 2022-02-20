import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { database } from '../firebase/firebase';
import {
  equalTo,
  orderByChild,
  ref,
  query,
  onValue,
  set,
  child,
} from 'firebase/database';

const DeleteModal = ({ show, setShow, postId, pageToken }) => {
  const handleClose = () => setShow(false);
  const handleDelete = async () => {
    const postRef = ref(database, 'posts');
    const url = `https://graph.facebook.com/${postId}`;
    const params = {
      params: {
        access_token: pageToken,
      },
    };
    await axios.delete(url, params);
    onValue(
      query(postRef, orderByChild('facebook_post_id'), equalTo(postId)),
      (snapshot) => {
        snapshot.forEach((post) => {
          if (post.val().instagram_posted) {
            set(child(post.ref, 'facebook_posted'), false);
            set(child(post.ref, 'facebook_post_id'), '');
          } else {
            set(post.ref, null);
          }
        });
      }
    );
    alert('FACEBOOK DELETE SUCCESS!!!');
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop='static' size='sm'>
      <Modal.Body>Deleting this post?</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          No
        </Button>
        <Button variant='primary' onClick={handleDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
