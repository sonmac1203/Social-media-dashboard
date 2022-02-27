import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Modal,
  DropdownButton,
  Dropdown,
  Row,
  Badge,
} from 'react-bootstrap';
import axios from 'axios';
import MediaUpload from './MediaUpload';
import DateTimePicker from 'react-datetime-picker';
import { ref, set, child } from 'firebase/database';
import { database } from '../firebase/firebase';
import { useAuth } from '../Login/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const InputModal = ({ user, profiles, setReload }) => {
  const [content, setContent] = useState('');
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [fakeImageUrl, setFakeImageUrl] = useState('');
  const [rows, setRows] = useState(5);
  const [progress, setProgress] = useState(0);
  const [chosenIndices, setChosenIndices] = useState([]);
  const [instaChosen, setInstaChosen] = useState(false);
  const { currentUser } = useAuth();
  const [time, setTime] = useState(new Date());
  const [pickerShown, setPickerShown] = useState(false);
  const togglePicker = () => {
    setPickerShown(!pickerShown);
  };

  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const handleShowMediaUpload = () => setShowMediaUpload(true);
  const handleClose = () => {
    setShow(false);
    setImageUrl('');
    setFakeImageUrl('');
    setChosenIndices([]);
    setInstaChosen(false);
    setPickerShown(false);
    setTime(new Date());
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    if (imageUrl || fakeImageUrl) {
      setRows(7);
    } else {
      setRows(5);
    }
  }, [imageUrl, fakeImageUrl]);

  const makePost = async () => {
    for (const index of chosenIndices) {
      const profile = profiles[index];
      if (profile.type === 'facebook') {
        const url = `https://graph.facebook.com/${profile.page_id}/${
          imageUrl ? 'photos' : 'feed'
        }`;
        const params = {
          params: {
            url: imageUrl,
            message: content,
            access_token: profile.page_token,
          },
        };

        await axios.post(url, null, params);
      } else if (profile.type === 'instagram') {
        let url = `https://graph.facebook.com/v12.0/${profile.page_id}/media`;
        let params = {
          params: {
            image_url: imageUrl,
            caption: content,
            access_token: profile.access_token,
          },
        };
        const firstResponse = await axios.post(url, null, params);
        url = `https://graph.facebook.com/${profile.page_id}/media_publish`;
        params = {
          params: {
            creation_id: firstResponse.data.id,
            access_token: profile.access_token,
          },
        };
        await axios.post(url, null, params);
      }
    }
    toast.success('Your post has been published!');
    handleClose();
    setReload(true);
  };

  const schedulePost = async () => {
    const scheduledPostRef = child(
      child(ref(database, 'users'), currentUser.uid),
      'scheduled_posts'
    );
    if (instaChosen) {
      toast.error('Please only chedule a Facebook post. Please try again.');
    } else {
      const currentTime = Math.floor(new Date().getTime() / 1000);
      const chosenTime = Math.floor(time.getTime() / 1000);
      if (chosenTime - currentTime < 900) {
        toast.error(
          'Please schedule the post at least 15 minutes from the current time.'
        );
      } else {
        for (const index of chosenIndices) {
          const profile = profiles[index];

          const url = `https://graph.facebook.com/${profile.page_id}/${
            imageUrl ? 'photos' : 'feed'
          }`;
          const params = {
            params: {
              message: content,
              url: imageUrl,
              published: false,
              scheduled_publish_time: chosenTime,
              access_token: profile.page_token,
            },
          };
          const response = await axios.post(url, null, params);
          const postId = imageUrl
            ? profile.page_id + '_' + response.data.id
            : response.data.id;
          set(child(scheduledPostRef, postId), {
            account_name: profile.name,
            page_token: profile.page_token,
            scheduled_time: chosenTime,
          });
          toast.success('Your post has been scheduled!');
          handleClose();
        }
      }
    }
  };

  return (
    <Row className='input-row mt-4'>
      <h3 className='text-center'>Let's make a post!</h3>
      <div className='d-flex justify-content-between align-items-center mt-2'>
        <img
          src={user.avatar_url}
          className='input-field-avatar me-3'
          alt='avatar'
        />
        <button onClick={handleShow} className='post-btn ps-3'>
          What are you posting today, {user.name}?
        </button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        size='md'
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className='input-modal-title ms-2'>
            Make a new post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-2'>
            {chosenIndices.map((index, key) => (
              <Badge className='selected-profile-badge' key={key}>
                <img
                  src={profiles[index].profile_picture_url}
                  className='selected-profile-picture'
                  alt='avatar'
                />
                {profiles[index].name}
                <i
                  className='fas fa-times'
                  onClick={() => {
                    setChosenIndices(chosenIndices.filter((i) => i !== index));
                  }}
                ></i>
              </Badge>
            ))}
          </div>
          <div className='compose-input'>
            <Form>
              <Form.Group controlId='update-form'>
                <Form.Control
                  as='textarea'
                  placeholder='Type your post here ...'
                  rows={rows}
                  autoFocus
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
            </Form>
            {fakeImageUrl && !imageUrl && (
              <div className='compose-input-fake-photo'>
                <p>{progress} %</p>
                <img src={fakeImageUrl} alt='uploaded' height='110px' />
              </div>
            )}
            {imageUrl && (
              <img
                className='compose-input-photo'
                src={imageUrl}
                alt='uploaded'
                height='110px'
              />
            )}
            <i
              className='fas fa-file-image compose-input-button'
              onClick={handleShowMediaUpload}
            ></i>
            <MediaUpload
              show={showMediaUpload}
              setShow={setShowMediaUpload}
              setImageUrl={setImageUrl}
              setFakeImageUrl={setFakeImageUrl}
              fakeImageUrl={fakeImageUrl}
              setProgress={setProgress}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between align-items-end'>
          <div>
            <div className='d-flex justify-contents-start align-items-center'>
              <DropdownButton
                id='dropdown-basic-button'
                title='Select a profile'
                autoClose={false}
              >
                {profiles.map((profile, key) => (
                  <Dropdown.Item
                    className='d-flex justify-content-between align-items-center'
                    key={key}
                    onClick={() => {
                      if (!chosenIndices.includes(key)) {
                        setChosenIndices([...chosenIndices, key]);
                      }
                      if (profile.type === 'instagram') {
                        setInstaChosen(true);
                      }
                    }}
                  >
                    <div className='d-flex align-items-center'>
                      {profile.type === 'facebook' ? (
                        <i className='fab fa-facebook-square me-2 drop-down-icon'></i>
                      ) : (
                        <i className='fab fa-instagram me-2 drop-down-icon'></i>
                      )}
                      {profile.name}
                    </div>
                  </Dropdown.Item>
                ))}
                {profiles.length === 0 && (
                  <Dropdown.Item disabled>Not found</Dropdown.Item>
                )}
              </DropdownButton>
              <i
                className='far fa-calendar-check ms-3'
                style={{ fontSize: 35 }}
                onClick={togglePicker}
              ></i>
            </div>
            {pickerShown && (
              <DateTimePicker
                onChange={setTime}
                value={time}
                className='mt-3'
              />
            )}
          </div>

          <Button
            disabled={
              chosenIndices.length === 0 ||
              !content ||
              (instaChosen && !imageUrl)
            }
            onClick={pickerShown ? schedulePost : makePost}
          >
            {pickerShown ? 'Schedule' : 'Post'}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Row>
  );
};

export default InputModal;
