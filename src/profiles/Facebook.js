import React, { useState, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Facebook = () => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [shortToken, setShortToken] = useState('');
  const [longToken, setLongToken] = useState('');
  const [userID, setUserID] = useState('');
  const [pageLongToken, setPageLongToken] = useState('');
  const [pageID, setPageID] = useState('');
  const [content, setContent] = useState('');

  const responseFacebook = (response) => {
    setData(response);
    setShortToken(response.accessToken);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  useEffect(() => {
    if (login) {
      (async () => {
        const firstResponse = await axios.get(
          `https://graph.facebook.com/v12.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.REACT_APP_FACEBOOK_ID}&client_secret=${process.env.REACT_APP_FACEBOOK_SECRET}&fb_exchange_token=${shortToken}`
        );

        const secondResponse = await axios.get(
          `https://graph.facebook.com/v12.0/me?access_token=${firstResponse.data.access_token}`
        );

        const thirdResponse = await axios.get(
          `https://graph.facebook.com/${secondResponse.data.id}/accounts?access_token=${firstResponse.data.access_token}`
        );

        setLongToken(firstResponse.data.access_token);
        setUserID(secondResponse.data.id);
        setPageLongToken(thirdResponse.data.data[0].access_token);
        setPageID(thirdResponse.data.data[0].id);
      })();
    }
  }, [login, shortToken]);

  const postContent = () => {
    axios
      .post(
        `https://graph.facebook.com/${pageID}/feed?message=${content}&access_token=${pageLongToken}`
      )
      .then(() => {
        alert('SUCCESS!!!');
      });
  };

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
      <Form className='mt-5'>
        <Form.Group className='mb-3' controlId='testform'>
          <Form.Control
            as='textarea'
            placeholder='Enter your content'
            rows='3'
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' onClick={() => postContent()}>
          Submit
        </Button>
      </Form>
    </Col>
  );
};

export default Facebook;
