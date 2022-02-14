import React, { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, child, onValue, get } from 'firebase/database';
import Post from './Post';

const Posts = () => {
  const [list, setList] = useState([]);
  const fbRef = ref(database, 'facebook');
  const dbRef = ref(database);

  const [name, setName] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  get(child(dbRef, 'facebook'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setName(data.name);
        setImageUrl(data.profile_picture_url);
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });

  useEffect(() => {
    onValue(child(fbRef, 'posts'), (snapshot) => {
      if (snapshot.exists()) {
        var posts = [];
        snapshot.forEach((item) => {
          posts.push(item.val());
        });
        setList(posts);
      }
    });
  }, []);

  return (
    <div>
      {list.length > 0
        ? list.map((post, k) => (
            <Post post={post} key={k} imageUrl={imageUrl} name={name} />
          ))
        : 'No post yet'}
    </div>
  );
};

export default Posts;
