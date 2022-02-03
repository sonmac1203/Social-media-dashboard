import React, { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const Facebook = ({ fb, setFb }) => {
  const responseFacebook = (response) => {
    if (response.accessToken) {
      setFb({
        ...fb,
        login: true,
        shortToken: response.accessToken,
        userID: response.userID,
      });
    } else {
      setFb({ ...fb, login: false });
    }
  };

  const { login, shortToken, userID } = fb;
  useEffect(() => {
    if (login) {
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
          `https://graph.facebook.com/${userID}/accounts`,
          { params: { access_token: firstResponse.data.access_token } }
        );

        setFb({
          ...fb,
          pageID: secondResponse.data.data[0].id,
          pageLongToken: secondResponse.data.data[0].access_token,
        });
      })();
    }
  }, [login, shortToken]);

  return (
    <Col xl='3'>
      <Card style={{ width: '260px' }}>
        <Card.Body>
          <Card.Title>
            <div>
              <i className='fab fa-facebook-square mb-2' />
            </div>
            <div>Facebook</div>
          </Card.Title>
          <Card.Text>Connect to your Facebook profile</Card.Text>
          {!login && (
            <FacebookLogin
              appId='959795267956866'
              autoLoad={true}
              fields='name'
              scope='public_profile,pages_manage_posts,pages_read_engagement,pages_show_list'
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

export default Facebook;
