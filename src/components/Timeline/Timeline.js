import React, { useState, useEffect } from 'react';
import { database } from '../../firebase/firebase';
import {
  ref,
  child,
  onValue,
  query,
  orderByKey,
  equalTo,
} from 'firebase/database';
import { Dropdown, DropdownButton, Col } from 'react-bootstrap';
import Posts from './management/Posts';
import InputModal from './compose/InputModal';
import { useAuth } from '../../Login/contexts/AuthContext';
import axios from 'axios';

const Timeline = () => {
  const [profiles, setProfiles] = useState(null);
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [chosenIndex, setChosenIndex] = useState(0);
  const [chosenProfile, setChosenProfile] = useState('');
  const [user, setUser] = useState({});

  useEffect(async () => {
    if (profiles && profiles.length > 0 && chosenIndex !== null) {
      const profile = profiles[chosenIndex];
      if (profile.type === 'facebook') {
        const response = await axios.get(
          `https://graph.facebook.com/${profile.page_id}/feed`,
          {
            params: {
              access_token: profile.access_token,
              fields: 'picture,message,created_time',
            },
          }
        );
        setPosts(response.data.data);
      } else if (profile.type === 'instagram') {
        const response = await axios.get(
          `https://graph.facebook.com/${profile.page_id}/media`,
          {
            params: {
              access_token: profile.access_token,
              fields: 'caption,media_url,timestamp',
            },
          }
        );
        setPosts(response.data.data);
      }
    }
  }, [chosenIndex, profiles]);

  useEffect(() => {
    const userRef = ref(database, 'users');
    onValue(
      query(userRef, orderByKey(), equalTo(currentUser.uid)),
      (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((item) => {
            setUser(item.val());
          });
        }
      }
    );

    const profileRef = child(
      child(ref(database, 'users'), currentUser.uid),
      'profiles_connected'
    );
    onValue(profileRef, (snapshot) => {
      if (snapshot.exists()) {
        const profileList = [];
        snapshot.forEach((item) => {
          profileList.push(item.val());
        });
        setProfiles(profileList);
        if (profileList.length > 0) {
          setChosenProfile(profileList[0].name);
        } else {
          setChosenProfile('Not found');
        }
      }
    });
  }, []);

  return (
    <Col lg={{ span: 6, offset: 3 }} className='timeline-col'>
      {profiles && profiles.length > 0 ? (
        <div>
          <InputModal user={user} profiles={profiles} />
          <DropdownButton
            id='dropdown-media'
            title={chosenProfile}
            align='end'
            className='mb-3 d-flex justify-content-end'
          >
            {profiles.map(
              (profile, key) =>
                chosenProfile !== profile.name && (
                  <Dropdown.Item
                    className='d-flex justify-content-between align-items-center'
                    key={key}
                    onClick={() => {
                      setChosenIndex(key);
                      setChosenProfile(profile.name);
                    }}
                  >
                    <div className='d-flex align-items-center'>
                      {profile.type === 'facebook' ? (
                        <i className='fab fa-facebook-square me-2 drop-down-icon'></i>
                      ) : (
                        <i className='fab fa-instagram me-2 drop-down-icon'></i>
                      )}
                      <strong>{profile.name}</strong>
                    </div>
                  </Dropdown.Item>
                )
            )}
            {profiles.length === 0 && (
              <Dropdown.Item disabled>Not found</Dropdown.Item>
            )}
          </DropdownButton>
          {posts !== null && chosenIndex !== null && (
            <Posts posts={posts} profile={profiles[chosenIndex]} />
          )}
        </div>
      ) : (
        <div className='d-flex justify-content-center'>
          <h3>Please connect to a profile</h3>
        </div>
      )}
    </Col>
  );
};

export default Timeline;
