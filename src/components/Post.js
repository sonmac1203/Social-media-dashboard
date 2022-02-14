import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { database } from '../firebase/firebase';
import { ref } from 'firebase/database';
import { DateTime } from 'luxon';

const Post = ({ post: { content, image, time }, imageUrl, name }) => {
  const dbRef = ref(database);

  return (
    <Container className='mt-4'>
      <Row className='mb-5 border ps-3 pt-2'>
        <div className='d-flex justify-content-start mt-3 mb-2'>
          <img
            src={imageUrl}
            alt='page-avatar'
            className='facebook-post-avatar'
          />
          <div className='ms-3'>
            <strong>{name}</strong>
            <h6 className='facebook-post-time-stamp'>{`Posted at ${DateTime.fromISO(
              time
            ).toFormat('ff')}`}</h6>
          </div>
        </div>
        <div>
          <p className='post-content'>{content}</p>
        </div>
        {image && (
          <img
            src={image}
            alt='image uploaded with this post'
            className='facebook-post-image mb-4'
          />
        )}
      </Row>
    </Container>
  );
};

export default Post;
