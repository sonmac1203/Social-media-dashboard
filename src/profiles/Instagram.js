import React, { useEffect, useState } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';
import { database } from '../firebase/firebase';
import { ref, set } from 'firebase/database';

const Instagram = ({ login, setLogin }) => {
  const [userToken, setUserToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const responseFacebook = (response) => {
    if (response.accessToken) {
      setLogin(true);
      setUserToken(response.accessToken);
    } else {
      // setLogin(false);
    }
  };

  useEffect(() => {
    // if (login && userToken) {
    if (userToken) {
      (async () => {
        const zeroResponse = await axios.get(
          'https://graph.facebook.com/v12.0/oauth/access_token',
          {
            params: {
              grant_type: 'fb_exchange_token',
              client_id: process.env.REACT_APP_FACEBOOK_ID,
              client_secret: process.env.REACT_APP_FACEBOOK_SECRET,
              fb_exchange_token: userToken,
            },
          }
        );

        const firstResponse = await axios.get(
          'https://graph.facebook.com/v12.0/me/accounts',
          { params: { access_token: zeroResponse.data.access_token } }
        );
        const secondResponse = await axios.get(
          `https://graph.facebook.com/v12.0/${firstResponse.data.data[0].id}`,
          {
            params: {
              fields: 'instagram_business_account',
              access_token: zeroResponse.data.access_token,
            },
          }
        );
        const thirdResponse = await axios.get(
          `https://graph.facebook.com/v13.0/${secondResponse.data.instagram_business_account.id}`,
          {
            params: {
              fields: 'name,profile_picture_url',
              access_token: zeroResponse.data.access_token,
            },
          }
        );
        set(ref(database, 'instagram'), {
          name: thirdResponse.data.name,
          profile_picture_url: thirdResponse.data.profile_picture_url,
          access_token: zeroResponse.data.access_token,
          page_id: secondResponse.data.instagram_business_account.id,
        });
      })();
    }
  }, [login, userToken]);

  return (
    <Col xl='3'>
      <Card style={{ width: '260px' }}>
        <Card.Body>
          <Card.Title>
            <div>
              <i className='fab fa-instagram mb-2' />
            </div>
            <div>Instagram</div>
          </Card.Title>
          <Card.Text>Connect to your Instagram profile</Card.Text>
          {!login && (
            <FacebookLogin
              appId='959795267956866'
              autoLoad={true}
              fields='name'
              scope='public_profile,pages_read_engagement,pages_show_list,instagram_basic,business_management,ads_management,instagram_content_publish'
              callback={responseFacebook}
              render={(renderProps) => (
                <Button onClick={renderProps.onClick}>Add</Button>
              )}
            />
          )}
          {login && <Button disabled>Added</Button>}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Instagram;
