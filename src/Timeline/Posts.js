import React from 'react';
import Loading from '../Loading';
import Post from './Post';

const Posts = ({
  posts,
  profile: { name, profile_picture_url, page_token },
}) => {
  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post, k) => (
          <Post
            post={post}
            key={k}
            imageUrl={profile_picture_url}
            name={name}
            pageToken={page_token}
          />
        ))
      ) : (
        <div className='d-flex justify-content-center'>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Posts;
