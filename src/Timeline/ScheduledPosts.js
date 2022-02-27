import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Login/AuthContext';
import { database } from '../firebase/firebase';
import { ref, child, onValue, query, orderByChild } from 'firebase/database';
import { Row } from 'react-bootstrap';
import { DateTime } from 'luxon';

const ScheduledPosts = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const postsRef = child(
      child(ref(database, 'users'), currentUser.uid),
      'scheduled_posts'
    );
    onValue(query(postsRef, orderByChild('scheduled_time')), (snapshot) => {
      if (snapshot.exists()) {
        const postList = [];
        snapshot.forEach((item) => {
          const aPost = {
            postId: item.key,
            accountName: item.val().account_name,
            accountAvatar: item.val().account_avatar,
            pageToken: item.val().page_token,
            scheduledTime: item.val().scheduled_time,
          };
          postList.push(aPost);
        });
        setPosts(postList);
      }
    });
  }, []);
  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post, key) => <ScheduledPost post={post} key={key} />)
      ) : (
        <h6 className='text-center'>No post has been scheduled yet.</h6>
      )}
    </>
  );
};

const ScheduledPost = ({
  post: { postId, accountName, pageToken, scheduledTime },
}) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`https://graph.facebook.com/${postId}`, {
        params: {
          access_token: pageToken,
          fields: 'picture,message,is_published',
        },
      });
      setMessage(response.data.message);
      setImage(response.data.picture);
      setIsPublished(response.data.is_published);
    })();
  }, []);

  return (
    !isPublished && (
      <Row className='mb-5 timeline-post-row ps-2 pt-2'>
        <div className='px-2 mt-2'>
          <h6 className='scheduled-post-time-stamp'>
            Publishing at
            {' ' + DateTime.fromSeconds(scheduledTime).toFormat('ff')}
          </h6>
          <div>
            <i
              className='fab fa-facebook me-2'
              style={{ fontSize: 23, color: '#1778f2' }}
            ></i>
            <strong style={{ fontSize: 23 }}>{accountName}</strong>
          </div>
        </div>
        <p className='mt-2 scheduled-post-content'>{message}</p>
        {image && (
          <img
            src={image}
            alt='uploaded with this post'
            className='post-image mb-4'
          />
        )}
      </Row>
    )
  );
};

export default ScheduledPosts;
