import React, { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, child, onValue } from 'firebase/database';
import { Dropdown, DropdownButton, Col, Button } from 'react-bootstrap';
import Posts from './Posts';
import InputModal from './InputModal';
import { useAuth } from '../Login/AuthContext';
import axios from 'axios';
import ScheduledPosts from './ScheduledPosts';
import { Link } from 'react-router-dom';

const Timeline = () => {
  const [profiles, setProfiles] = useState([]);
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState(null);
  const [chosenIndex, setChosenIndex] = useState(0);
  const [chosenProfile, setChosenProfile] = useState('');
  const [user, setUser] = useState({});
  const [reload, setReload] = useState(false);
  const [scheduleChosen, setScheduleChosen] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (profiles && profiles.length > 0 && chosenIndex !== null) {
      const profile = profiles[chosenIndex];
      if (profile.type === 'facebook') {
        (async () => {
          setFetching(true);
          const response = await axios.get(
            `https://graph.facebook.com/${profile.page_id}/feed`,
            {
              params: {
                access_token: profile.access_token,
                fields:
                  'picture,message,created_time,likes.summary(true).limit(0),comments.summary(true).limit(0)',
              },
            }
          );
          setPosts(response.data.data);
          setFetching(false);
        })();
      } else if (profile.type === 'instagram') {
        (async () => {
          setFetching(true);
          const response = await axios.get(
            `https://graph.facebook.com/${profile.page_id}/media`,
            {
              params: {
                access_token: profile.access_token,
                fields: 'caption,media_url,timestamp,like_count,comments_count',
              },
            }
          );
          setPosts(response.data.data);
          setFetching(false);
        })();
      }
      setReload(false);
    }
  }, [chosenIndex, profiles, reload]);

  useEffect(() => {
    const userRef = ref(database, 'users');
    onValue(child(userRef, currentUser.uid), (user) => {
      setUser(user.val());
    });

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
      <InputModal user={user} profiles={profiles} setReload={setReload} />
      {profiles && profiles.length > 0 ? (
        <div>
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
                      setScheduleChosen(false);
                    }}
                  >
                    <div className='d-flex align-items-center'>
                      {profile.type === 'facebook' ? (
                        <i className='fab fa-facebook-square me-2 drop-down-icon'></i>
                      ) : (
                        <i className='fab fa-instagram me-2 drop-down-icon'></i>
                      )}
                      {profile.name}
                    </div>
                  </Dropdown.Item>
                )
            )}
            {chosenProfile !== 'Scheduled posts' && (
              <Dropdown.Item
                onClick={() => {
                  setScheduleChosen(true);
                  setChosenProfile('Scheduled posts');
                }}
              >
                <div className='d-flex align-items-center'>
                  <i className='far fa-calendar-alt drop-down-icon me-2'></i>
                  Scheduled posts
                </div>
              </Dropdown.Item>
            )}
          </DropdownButton>
          {posts !== null && chosenIndex !== null && !scheduleChosen && (
            <Posts
              posts={posts}
              profile={profiles[chosenIndex]}
              fetching={fetching}
              setReload={setReload}
            />
          )}
          {scheduleChosen && <ScheduledPosts />}
        </div>
      ) : (
        <div className='d-flex flex-column align-items-center mt-5'>
          <h6 className='text-center mb-3'>
            You have not connected to any profile.
          </h6>
          <Link to='/connect'>
            <Button>GET STARTED</Button>
          </Link>
        </div>
      )}
    </Col>
  );
};

export default Timeline;
