import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { DateTime } from 'luxon';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const Post = ({ post, imageUrl, name, pageToken }) => {
  const message = post.message ? post.message : post.caption;
  const picture = post.picture ? post.picture : post.media_url;
  const created_time = post.created_time ? post.created_time : post.timestamp;
  const [editShow, setEditShow] = useState(false);
  const handleEditShow = () => setEditShow(true);
  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteShow = () => setDeleteShow(true);

  return (
    <Row className='mb-5 timeline-post-row ps-2 pt-2'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex justify-content-start mt-3 mb-2'>
          <img
            src={imageUrl}
            alt='page-avatar'
            className='facebook-post-avatar'
          />
          <div className='ms-3'>
            <strong>{name}</strong>
            <h6 className='facebook-post-time-stamp'>{`Posted at ${DateTime.fromISO(
              created_time
            ).toFormat('ff')}`}</h6>
          </div>
        </div>
        <div className='me-3 mt-3 facebook-post-functions'>
          {pageToken && (
            <i className='fas fa-edit' onClick={handleEditShow}></i>
          )}
          <i className='fas fa-trash ms-3' onClick={handleDeleteShow}></i>
        </div>
      </div>
      <div>
        <p className='post-content'>{message}</p>
        {/* <EditModal
          show={editShow}
          setShow={setEditShow}
          name={name}
          post={post}
          pageToken={pageToken}
          imageUrl={imageUrl}
        />
        <DeleteModal
          show={deleteShow}
          setShow={setDeleteShow}
          postId={facebook_post_id}
          pageToken={pageToken}
        /> */}
      </div>
      {picture && (
        <img
          src={picture}
          alt='uploaded with this post'
          className='post-image mb-4'
        />
      )}
    </Row>
  );
};

export default Post;
