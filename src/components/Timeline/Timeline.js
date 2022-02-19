import React, { useState, useEffect } from 'react';
import { database } from '../../firebase/firebase';
import {
  ref,
  child,
  query,
  orderByChild,
  onValue,
  orderByKey,
} from 'firebase/database';
import { Dropdown, DropdownButton, Col } from 'react-bootstrap';
import Posts from './management/Posts';
import InputModal from './compose/InputModal';
import { useAuth } from '../../Login/contexts/AuthContext';

const Timeline = ({ fbLogin, instaLogin }) => {
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

  const [chosenType, setChosenType] = useState('All posts');
  const [profiles, setProfiles] = useState(null);
  const { currentUser } = useAuth();

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

  // useEffect(() => {
  //   getUserNameAndAvatar('facebook');
  //   getUserNameAndAvatar('instagram');

  //   onValue(query(postRef, orderByChild('time')), (snapshot) => {
  //     if (snapshot.exists()) {
  //       var posts = {};
  //       snapshot.forEach((item) => {
  //         posts[item.key] = item.val();
  //       });
  //       setList(posts);
  //     }
  //   });
  //   // get(query(postRef, orderByChild('time'))).then((snapshot) => {
  //   //   if (snapshot.exists()) {
  //   //     var posts = {};
  //   //     snapshot.forEach((item) => {
  //   //       posts[item.key] = item.val();
  //   //     });
  //   //     setList(posts);
  //   //   }
  //   // });
  // }, []);

  useEffect(() => {
    const profileRef = child(
      child(ref(database, 'users'), currentUser.uid),
      'profiles_connected'
    );
    const profileList = [];
    onValue(query(profileRef, orderByKey()), (snapshot) => {
      if (snapshot.exists()) {
        console.log('im in this useEffec');
        snapshot.forEach((item) => {
          profileList.push(item.val());
        });
      }
      setProfiles(profileList);
      console.log(profiles);
    });
  }, []);

  // useEffect(() => {
  //   // console.log('I am in useEffect');
  //   // onChildAdded(postRef, (data) => {
  //   //   if (!(data.key in list)) {
  //   //     setList({ [data.key]: data.val(), ...list });
  //   //   }
  //   // });

  //   // console.log(list);

  //   const fbArray = [];
  //   const instaArray = [];
  //   const allArray = [];

  //   for (const key in list) {
  //     if (list[key].facebook_posted) {
  //       fbArray.push(list[key]);
  //     }
  //     if (list[key].instagram_posted) {
  //       instaArray.push(list[key]);
  //     }
  //     allArray.push(list[key]);
  //   }

  //   setFbPosts(fbArray);
  //   setInstaPosts(instaArray);
  //   setAllPosts(allArray);
  // }, [list]);
  return (
    <div>
      <Col lg={{ span: 6, offset: 3 }} className='timeline-col'>
        <InputModal
          fbLogin={fbLogin}
          instaLogin={instaLogin}
          profiles={profiles}
        />
        {/* <DropdownButton
          id='dropdown-media'
          title={chosenType}
          className='mb-3 d-flex justify-content-end'
        >
          {chosenType !== 'All posts' && (
            <Dropdown.Item onClick={() => setChosenType('All posts')}>
              All posts
            </Dropdown.Item>
          )}
          {chosenType !== 'Facebook' && fbLogin && (
            <Dropdown.Item onClick={() => setChosenType('Facebook')}>
              Facebook
            </Dropdown.Item>
          )}
          {chosenType !== 'Instagram' && instaLogin && (
            <Dropdown.Item onClick={() => setChosenType('Instagram')}>
              Instagram
            </Dropdown.Item>
          )}
        </DropdownButton>
        {chosenType === 'All posts' && <Posts posts={allPosts} />}
        {chosenType === 'Facebook' && (
          <Posts
            posts={fbPosts}
            name={fbName}
            imageUrl={fbImageUrl}
            pageToken={fbPageToken}
          />
        )}
        {chosenType === 'Instagram' && (
          <Posts posts={instaPosts} name={instaName} imageUrl={instaImageUrl} />
        )} */}
      </Col>
    </div>
  );
};

export default Timeline;
