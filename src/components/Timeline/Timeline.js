import React, { useState, useEffect } from 'react';
import { database } from '../../firebase/firebase';
import { ref, child, onValue } from 'firebase/database';
import { Dropdown, DropdownButton, Col } from 'react-bootstrap';
import Posts from './management/Posts';
import InputModal from './compose/InputModal';
import { useAuth } from '../../Login/contexts/AuthContext';
import axios from 'axios';

const Timeline = () => {
  const [profiles, setProfiles] = useState([]);
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [chosenIndex, setChosenIndex] = useState(null);

  useEffect(async () => {
    if (chosenIndex !== null) {
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
  }, [chosenIndex]);

  useEffect(() => {
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
      }
    });
  }, []);

  return (
    <div>
      <Col lg={{ span: 6, offset: 3 }} className='timeline-col'>
        <InputModal profiles={profiles} />
        <DropdownButton
          id='dropdown-media'
          title='Select a profile'
          align='end'
          className='mb-3 d-flex justify-content-end'
        >
          {profiles.map((profile, key) => (
            <Dropdown.Item
              className='d-flex justify-content-between align-items-center'
              key={key}
              onClick={() => {
                setChosenIndex(key);
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
          ))}
          {profiles.length === 0 && (
            <Dropdown.Item disabled>Not found</Dropdown.Item>
          )}
        </DropdownButton>
        {posts && profiles && chosenIndex !== null && (
          <Posts posts={posts} profile={profiles[chosenIndex]} />
        )}
      </Col>
    </div>
  );
};

export default Timeline;
