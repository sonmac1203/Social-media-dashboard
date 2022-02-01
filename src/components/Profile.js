import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Profile = ({ name, iconName }) => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');
  const [shortToken, setShortToken] = useState('');
  const [longToken, setLongToken] = useState('');
  const [userID, setUserID] = useState('');
  const [pageShortToken, setPageShortToken] = useState('');
  const [pageLongToken, setPageLongToken] = useState('');
  const [pageID, setPageID] = useState('');
  const [content, setContent] = useState('');

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setShortToken(response.accessToken);
    console.log(shortToken);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  const hihihi = async () => {
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
    console.log(thirdResponse.data);
    setPageLongToken(thirdResponse.data.data[0].access_token);
    setPageID(thirdResponse.data.data[0].id);
    console.log(longToken);
    console.log(thirdResponse.data.data[0].access_token);
    console.log(thirdResponse.data.data[0].id);
  };

  const hahaha = () => {
    axios
      .post(
        `https://graph.facebook.com/${pageID}/feed?message=${content}&access_token=${pageLongToken}`
      )
      .then((res) => {
        console.log(res.data);
        alert('SUCCESS!!!');
      });
  };

  return (
    <Col xl='3'>
      <Card style={{ width: '260px' }}>
        <Card.Body>
          <Card.Title>
            <div>
              <i className={`${iconName} mb-2`} />
            </div>
            <div>{name}</div>
          </Card.Title>
          <Card.Text>Connect to your {name} profile</Card.Text>
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
          {login && <Button>Added</Button>}
          {login && (
            <Button className='ms-3' onClick={() => hihihi()}>
              Click this
            </Button>
          )}
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
        <Button variant='primary' onClick={() => hahaha()}>
          Submit
        </Button>
      </Form>
    </Col>
  );
};

export default Profile;
