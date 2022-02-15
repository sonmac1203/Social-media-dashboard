import React, { useState } from 'react';
import { Row, Container, Badge, Form, Button } from 'react-bootstrap';
// import { database } from '../firebase/firebase';
// import { ref } from 'firebase/database';
import { DateTime } from 'luxon';

const Post = ({
  post: { content, image, time, facebook_posted, insta_posted },
  imageUrl,
  name,
}) => {
  const [editChosen, setEditChosen] = useState(false);

  const [newContent, setNewContent] = useState('');

  return (
    <Container className='mt-4'>
      <Row className='mb-5 border ps-2 pt-2'>
        {imageUrl && name && (
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
              <i
                className='fas fa-edit'
                onClick={() => setEditChosen(true)}
              ></i>
              <i className='fas fa-trash ms-3'></i>
            </div>
          </div>
        )}
        {!imageUrl && !name && (
          <h6 className='facebook-post-time-stamp mt-2'>{`Posted at ${DateTime.fromMillis(
            time * -1
          ).toFormat('ff')}`}</h6>
        )}
        <div>
          {!editChosen ? (
            <p className='post-content'>{content}</p>
          ) : (
            <div>
              <Form className='mb-4 mt-2'>
                <Form.Group>
                  <Form.Control
                    as='textarea'
                    value={content}
                    rows='3'
                    onChange={(e) => setNewContent(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <div className='d-flex justify-content-end mb-4'>
                <Button>Update</Button>
              </div>
            </div>
          )}
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
            {insta_posted && <Badge className='me-3'>Instagram</Badge>}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Post;
