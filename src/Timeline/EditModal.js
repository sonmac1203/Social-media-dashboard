import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { DateTime } from 'luxon';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const EditModal = ({
  show,
  setShow,
  post: { message, created_time, id },
  name,
  pageToken,
  imageUrl,
  setReload,
}) => {
  const [newContent, setNewContent] = useState('');

  const handleClose = () => {
    setShow(false);
    setNewContent('');
  };

  const handleUpdate = async () => {
    const url = `https://graph.facebook.com/${id}`;
    const params = {
      params: {
        message: newContent,
        access_token: pageToken,
      },
    };
    await axios.post(url, null, params);
    toast.success('This post has been updated!');
    setShow(false);
    setReload(true);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        animation={false}
      >
        <Modal.Header>
          <Modal.Title className='d-flex justify-content-start'>
            <img src={imageUrl} alt='page-avatar' className='post-avatar' />
            <div className='ms-3'>
              <strong>{name}</strong>
              <h6 className='post-time-stamp'>
                Published at {DateTime.fromISO(created_time).toFormat('ff')}
              </h6>
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
                defaultValue={message}
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
        <ToastContainer />
      </Modal>
    </>
  );
};

export default EditModal;
