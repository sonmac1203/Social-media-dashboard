import React, { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import {
  ref,
  child,
  get,
  onChildAdded,
  query,
  orderByChild,
  onValue,
} from 'firebase/database';
import { Tab } from 'react-bootstrap';
import Posts from './Posts';

const Manage = () => {
  const [list, setList] = useState({});
  const dbRef = ref(database);
  const postRef = ref(database, 'posts');

  const [fbName, setFbName] = useState(null);
  const [fbImageUrl, setFbImageUrl] = useState(null);

  const [instaName, setInstaName] = useState(null);
  const [instaImageUrl, setInstaImageUrl] = useState(null);

  const [fbPosts, setFbPosts] = useState([]);
  const [instaPosts, setInstaPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const [fbPageToken, setFbPageToken] = useState(null);

  const getUserNameAndAvatar = (media) => {
    onValue(child(dbRef, media), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (media === 'facebook') {
          setFbName(data.name);
          setFbImageUrl(data.profile_picture_url);
          setFbPageToken(data.page_token);
        } else if (media === 'instagram') {
          setInstaName(data.name);
          setInstaImageUrl(data.profile_picture_url);
        }
      }
    });
  };

  useEffect(() => {
    getUserNameAndAvatar('facebook');
    getUserNameAndAvatar('instagram');

    onValue(query(postRef, orderByChild('time')), (snapshot) => {
      if (snapshot.exists()) {
        var posts = {};
        snapshot.forEach((item) => {
          posts[item.key] = item.val();
        });
        setList(posts);
      }
    });
    // get(query(postRef, orderByChild('time'))).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     var posts = {};
    //     snapshot.forEach((item) => {
    //       posts[item.key] = item.val();
    //     });
    //     setList(posts);
    //   }
    // });
  }, []);

  useEffect(() => {
    // console.log('I am in useEffect');
    // onChildAdded(postRef, (data) => {
    //   if (!(data.key in list)) {
    //     setList({ [data.key]: data.val(), ...list });
    //   }
    // });

    // console.log(list);

    const fbArray = [];
    const instaArray = [];
    const allArray = [];

    for (const key in list) {
      if (list[key].facebook_posted) {
        fbArray.push(list[key]);
      }
      if (list[key].instagram_posted) {
        instaArray.push(list[key]);
      }
      allArray.push(list[key]);
    }

    setFbPosts(fbArray);
    setInstaPosts(instaArray);
    setAllPosts(allArray);
  }, [list]);

  return (
    <Tab.Content>
      <Tab.Pane eventKey='timeline'>
        <Posts posts={allPosts} />
      </Tab.Pane>
      <Tab.Pane eventKey='fb'>
        <Posts
          posts={fbPosts}
          name={fbName}
          imageUrl={fbImageUrl}
          pageToken={fbPageToken}
        />
      </Tab.Pane>
      <Tab.Pane eventKey='insta'>
        <Posts posts={instaPosts} name={instaName} imageUrl={instaImageUrl} />
      </Tab.Pane>
    </Tab.Content>
  );
};

export default Manage;
