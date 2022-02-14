import React from 'react';
import Post from './Post';

const Posts = ({ posts, name, imageUrl }) => {
  return (
    <div>
      {posts.length > 0
        ? posts.map((post, k) => (
            <Post post={post} key={k} imageUrl={imageUrl} name={name} />
          ))
        : 'No post yet'}
    </div>
  );
};

export default Posts;
