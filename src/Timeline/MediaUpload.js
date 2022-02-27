import React, { useState } from 'react';
import { Modal, Button, Tabs, Tab, Form } from 'react-bootstrap';
import { storage } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';

const MediaUpload = ({
  show,
  setShow,
  setImageUrl,
  setFakeImageUrl,
  fakeImageUrl,
  setProgress,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const [key, setKey] = useState('upload');

  const handleClose = () => {
    setShow(false);
    if (key === 'upload') {
      setSelectedImage(null);
    } else if (key === 'link') {
      setImageUrl('');
    }
  };

  const handleSave = async (e) => {
    setShow(false);
    e.preventDefault();
    if (key === 'upload') {
      if (selectedImage) {
        setFakeImageUrl(URL.createObjectURL(selectedImage));
        const storageRef = ref(storage, `/images/${selectedImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
          },
          (error) => console.log(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setImageUrl(url);
            });
          }
        );
      }
    } else if (key === 'link') {
      setImageUrl(fakeImageUrl);
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        size='md'
        backdrop='static'
        style={{ marginTop: '50vh' }}
      >
        <Modal.Body>
          <Tabs
            activeKey={key}
            id='media-tabs'
            className='mb-3'
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey='upload' title='Upload file'>
              <div className='d-flex justify-content-between'>
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
              </div>
            </Tab>
            <Tab eventKey='link' title='Import URL'>
              <Form>
                <Form.Label>Provide the URL of the photo below</Form.Label>
                <Form.Control
                  as='textarea'
                  placeholder='Enter the URL'
                  onChange={(e) => setFakeImageUrl(e.target.value)}
                />
              </Form>
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
