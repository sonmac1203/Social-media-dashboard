import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Connect from './components/Connect/Connect';
import Timeline from './components/Timeline/Timeline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { database } from './firebase/firebase';
import { ref, onChildAdded } from 'firebase/database';

function App() {
  const [fbLogin, setFbLogin] = useState(false);
  const [instaLogin, setInstaLogin] = useState(false);

  useEffect(() => {
    onChildAdded(ref(database), (data) => {
      if (data.key === 'facebook') {
        setFbLogin(true);
      }
      if (data.key === 'instagram') {
        setInstaLogin(true);
      }
    });
  }, []);
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route
            exact
            path='/'
            element={<Connect fbLogin={fbLogin} instaLogin={instaLogin} />}
          />
          <Route
            exact
            path='/timeline'
            element={<Timeline fbLogin={fbLogin} instaLogin={instaLogin} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
