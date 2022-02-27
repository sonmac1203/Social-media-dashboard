import React, { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { database } from '../firebase/firebase';
import { ref, push, child } from 'firebase/database';
import { useAuth } from '../Login/AuthContext';

const Facebook = () => {
  const [shortToken, setShortToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const { currentUser } = useAuth();

  const responseFacebook = (response) => {
    if (response.accessToken) {
      setShortToken(response.accessToken);
      setUserId(response.userID);
    }
  };

  useEffect(() => {
    if (shortToken && userId) {
      const userRef = child(ref(database, 'users'), currentUser.uid);
      (async () => {
        const firstResponse = await axios.get(
          'https://graph.facebook.com/v12.0/oauth/access_token',
          {
            params: {
              grant_type: 'fb_exchange_token',
              client_id: process.env.REACT_APP_FACEBOOK_ID,
              client_secret: process.env.REACT_APP_FACEBOOK_SECRET,
              fb_exchange_token: shortToken,
            },
          }
        );

        const secondResponse = await axios.get(
          `https://graph.facebook.com/${userId}/accounts`,
          { params: { access_token: firstResponse.data.access_token } }
        );

        const thirdResponse = await axios.get(
          `https://graph.facebook.com/v13.0/${secondResponse.data.data[0].id}/picture`,
          {
            params: {
              type: 'large',
              redirect: 'false',
              access_token: shortToken,
            },
          }
        );
        const profile = {
          name: secondResponse.data.data[0].name,
          profile_picture_url: thirdResponse.data.data.url,
          access_token: firstResponse.data.access_token,
          page_token: secondResponse.data.data[0].access_token,
          page_id: secondResponse.data.data[0].id,
          type: 'facebook',
        };
        push(child(userRef, 'profiles_connected'), profile);
      })();
    }
  }, [shortToken, userId]);

  return (
    <Col md='6' lg={{ span: 6, offset: 3 }}>
      <Card className='connect-row'>
        <Card.Body>
          <Card.Title>
            <i className='fab fa-facebook-square mb-2' />
            <div>Facebook</div>
          </Card.Title>
          <Card.Text>Connect to your Facebook profile</Card.Text>
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_ID}
            scope='public_profile,pages_manage_posts,pages_read_engagement,pages_show_list'
            callback={responseFacebook}
            render={(renderProps) => (
              <Button onClick={renderProps.onClick}>Connect</Button>
            )}
          />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Facebook;
