import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const DeleteModal = ({ show, setShow, postId, pageToken, setReload }) => {
  const handleClose = () => setShow(false);
  const handleDelete = async () => {
    const url = `https://graph.facebook.com/${postId}`;
    const params = {
      params: {
        access_token: pageToken,
      },
    };
    await axios.delete(url, params);
    toast.success('This post has been deleted!');
    setShow(false);
    setReload(true);
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
      <ToastContainer />
    </Modal>
  );
};

export default DeleteModal;
