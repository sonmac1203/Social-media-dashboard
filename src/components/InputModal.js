import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const InputModal = ({ fb, insta, content, setContent }) => {
  const { pageID: fbPageID, pageLongToken, login: fbLogin } = fb;
  const { pageID: instaPageID, userToken, login: instaLogin } = insta;

  const postContent = async () => {
    if (fbLogin) {
      axios
        .post(`https://graph.facebook.com/${fbPageID}/feed`, null, {
          params: { message: content, access_token: pageLongToken },
        })
        .then(() => {
          alert('SUCCESS!!!');
        });
    }
    if (instaLogin) {
      const firstResponse = await axios.post(
        `https://graph.facebook.com/v12.0/${instaPageID}/media`,
        null,
        {
          params: {
            image_url:
              'https://www.sonmac.me/static/media/zendesk.05cc2e8250df4a92ea6c.jpg',
            caption: content,
            access_token: userToken,
          },
        }
      );

      await axios
        .post(`https://graph.facebook.com/${instaPageID}/media_publish`, null, {
          params: {
            creation_id: firstResponse.data.id,
            access_token: userToken,
          },
        })
        .then(() => {
          alert('SUCCESS!!!');
        });
    }
  };

  return (
    <div>
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
          Post
        </Button>
      </Form>
    </div>
  );
};

export default InputModal;
