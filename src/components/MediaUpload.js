import React, { useState } from 'react';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';
import { storage } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';

const MediaUpload = ({ setImageUrl, setFakeImageUrl, setProgress }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedImage(null);
  };
  const handleSave = async (e) => {
    setShow(false);
    if (selectedImage) {
      setFakeImageUrl(URL.createObjectURL(selectedImage));
      e.preventDefault();

      const storageRef = ref(storage, `/images/${selectedImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(prog);
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUrl(url);
          });
        }
      );
    }
  };

  return (
    <div>
      <i
        className='fas fa-file-image compose-input-button'
        onClick={handleShow}
      ></i>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size='md'
        backdrop='static'
      >
        <Modal.Body>
          <Tabs
            defaultActiveKey='upload'
            id='uncontrolled-tab-example'
            className='mb-3'
          >
            <Tab
              eventKey='upload'
              title='Upload file'
              className='d-flex justify-content-between'
            >
              <input
                type='file'
                accept='image/png, image/jpeg'
                id='input-photo'
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
              {selectedImage && (
                <img
                  className='upload-preview-photo'
                  src={URL.createObjectURL(selectedImage)}
                  alt='uploaded'
                />
              )}
            </Tab>
            <Tab eventKey='link' title='Import URL'>
              Please provide the URL of the photo below
              <input type='text' />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MediaUpload;
