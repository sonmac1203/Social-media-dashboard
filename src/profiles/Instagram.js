import React, { useEffect } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';

const Instagram = ({ insta, setInsta }) => {
  const responseFacebook = (response) => {
    console.log(response);
    if (response.accessToken) {
      setInsta({ ...insta, login: true, userToken: response.accessToken });
    } else {
      setInsta({ ...insta, login: false });
    }
  };

  const { login, userToken } = insta;
  useEffect(() => {
    if (login) {
      (async () => {
        const firstResponse = await axios.get(
          'https://graph.facebook.com/v12.0/me/accounts',
          { params: { access_token: userToken } }
        );
        console.log(firstResponse.data.data);
        const secondResponse = await axios.get(
          `https://graph.facebook.com/v12.0/${firstResponse.data.data[0].id}`,
          {
            params: {
              fields: 'instagram_business_account',
              access_token: userToken,
            },
          }
        );
        console.log(secondResponse.data.id);
        setInsta({
          ...insta,
          pageID: secondResponse.data.instagram_business_account.id,
          // pageID: secondResponse.data.id,
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
