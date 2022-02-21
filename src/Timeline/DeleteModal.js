import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const DeleteModal = ({ show, setShow, postId, pageToken }) => {
  const handleClose = () => setShow(false);
  const handleDelete = async () => {
    const url = `https://graph.facebook.com/${postId}`;
    const params = {
      params: {
        access_token: pageToken,
      },
    };
    await axios.delete(url, params);
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
