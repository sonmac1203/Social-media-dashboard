import React, { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { database } from '../../../firebase/firebase';
import { ref, set } from 'firebase/database';

const Facebook = ({ login }) => {
  const [shortToken, setShortToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const responseFacebook = (response) => {
    if (response.accessToken) {
      // setLogin(true);
      setShortToken(response.accessToken);
      setUserId(response.userID);
    } else {
      // setLogin(false);
    }
  };

  useEffect(() => {
    if (shortToken && userId) {
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
        set(ref(database, 'facebook'), {
          name: secondResponse.data.data[0].name,
          profile_picture_url: thirdResponse.data.data.url,
          access_token: firstResponse.data.access_token,
          page_token: secondResponse.data.data[0].access_token,
          page_id: secondResponse.data.data[0].id,
        });
      })();
    }
  }, [shortToken, userId]);

  return (
    <Col md='6' lg={{ span: 6, offset: 3 }}>
      <Card>
        <Card.Body>
          <Card.Title>
            <div className='d-flex justify-content-between'>
              <i className='fab fa-facebook-square mb-2' />
              <i className='fas fa-check-circle'></i>
            </div>
            <div>Facebook</div>
          </Card.Title>
          <Card.Text>Connect to your Facebook profile</Card.Text>
          {!login && (
            <FacebookLogin
              appId='959795267956866'
              scope='public_profile,pages_manage_posts,pages_read_engagement,pages_show_list'
              callback={responseFacebook}
              render={(renderProps) => (
                <Button onClick={renderProps.onClick}>Connect</Button>
              )}
            />
          )}
          {login && <Button disabled>Disconnect</Button>}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Facebook;