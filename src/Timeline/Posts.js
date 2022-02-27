import React from 'react';
import Loading from '../Loading';
import Post from './Post';

const Posts = ({
  posts,
  profile: { name, profile_picture_url, page_token },
  fetching,
  setReload,
}) => {
  return posts && posts.length > 0 ? (
    posts.map((post, k) => (
      <Post
        post={post}
        key={k}
        imageUrl={profile_picture_url}
        name={name}
        pageToken={page_token}
        setReload={setReload}
      />
    ))
  ) : (
    <div className='d-flex justify-content-center'>
      {fetching ? <Loading /> : <h6> No post found on this profile.</h6>}
    </div>
  );
};

export default Posts;
