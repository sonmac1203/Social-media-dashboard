import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { DateTime } from 'luxon';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const Post = ({ post, imageUrl, name, pageToken, setReload }) => {
  const message = post.message ? post.message : post.caption;
  const picture = post.picture ? post.picture : post.media_url;
  const created_time = post.created_time ? post.created_time : post.timestamp;
  const likeCount = post.likes
    ? post.likes.summary.total_count
    : post.like_count;
  const commentsCount = post.comments
    ? post.comments.summary.total_count
    : post.comments_count;
  const [editShow, setEditShow] = useState(false);
  const handleEditShow = () => setEditShow(true);
  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteShow = () => setDeleteShow(true);

  return (
    <Row className='mb-5 timeline-post-row ps-2 pt-2'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex justify-content-start mt-3 mb-2'>
          <img src={imageUrl} alt='page-avatar' className='post-avatar' />
          <div className='ms-3'>
            <strong>{name}</strong>
            <h6 className='post-time-stamp'>
              Published at {DateTime.fromISO(created_time).toFormat('ff')}
            </h6>
          </div>
        </div>
        <div className='me-3 mt-3 post-functions'>
          {pageToken && (
            <div>
              <i className='fas fa-edit' onClick={handleEditShow}></i>
              <i className='fas fa-trash ms-3' onClick={handleDeleteShow}></i>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className='post-content'>{message}</p>
        <EditModal
          show={editShow}
          setShow={setEditShow}
          name={name}
          imageUrl={imageUrl}
          post={post}
          pageToken={pageToken}
          setReload={setReload}
        />
        <DeleteModal
          show={deleteShow}
          setShow={setDeleteShow}
          postId={post.id}
          pageToken={pageToken}
          setReload={setReload}
        />
      </div>
      {picture && (
        <img
          src={picture}
          alt='uploaded with this post'
          className='post-image mb-4'
        />
      )}
      <div className='ms-2 mb-3'>
        <i
          className='fas fa-heart me-1'
          style={{ fontSize: '20px', color: '#C60C30' }}
        ></i>
        {likeCount}
        <i
          className='fas fa-comment me-1 ms-3'
          style={{ fontSize: '20px', color: '#71797E' }}
        ></i>
        {commentsCount}
      </div>
    </Row>
  );
};

export default Post;
