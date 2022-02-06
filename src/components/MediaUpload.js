import React, { useState } from 'react';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';

const MediaUpload = ({ setImageUrl }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedImage(null);
  };
  const handleSave = () => {
    setShow(false);
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
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
