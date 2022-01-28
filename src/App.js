import React, { useState } from 'react';
import NavBar from './components/NavBar';
import FacebookLogin from 'react-facebook-login';
import { Card, Image } from 'react-bootstrap';

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div>
      <NavBar />
    </div>
  );
}

export default App;
