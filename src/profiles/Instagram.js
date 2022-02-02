import React, { useState, useEffect } from 'react';
import { Col, Card, Button, Form } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';

const Instagram = () => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [pageID, setPageID] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState();
  const [instaPageID, setInstaPageID] = useState('');
  const [containerID, setContainerID] = useState('');

  const responseFacebook = (response) => {
    setData(response);
    setUserToken(response.accessToken);
    console.log(response);
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
          `https://graph.facebook.com/v12.0/me/accounts?access_token=${userToken}`
        );

        const secondResponse = await axios.get(
          `https://graph.facebook.com/v12.0/${firstResponse.data.data[0].id}?fields=instagram_business_account&access_token=${userToken}`
        );
        console.log(firstResponse.data.data[0].id);
        console.log(secondResponse.data.instagram_business_account.id);
        setPageID(firstResponse.data.data[0].id);
        setInstaPageID(secondResponse.data.instagram_business_account.id);
      })();
    }
  }, [login, userToken]);

  const postContent = async () => {
    const firstResponse = await axios.post(
      `https://graph.facebook.com/v12.0/${instaPageID}/media?image_url=https://www.sonmac.me/static/media/zendesk.05cc2e8250df4a92ea6c.jpg&caption=${content}&access_token=${userToken}`
    );

    const secondResponse = await axios
      .post(
        `https://graph.facebook.com/${instaPageID}/media_publish?creation_id=${firstResponse.data.id}&access_token=${userToken}`
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

export default Instagram;
