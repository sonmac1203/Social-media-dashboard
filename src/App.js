import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Connect from './components/Connect/Connect';
import Timeline from './components/Timeline/Timeline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { database } from './firebase/firebase';
import { ref, onChildAdded } from 'firebase/database';
import Signup from './Login/Signup';
import { AuthProvider } from './Login/contexts/AuthContext';
import Login from './Login/Login';
import { Profile } from './components/Management/Profile';
import PrivateRoute from './Login/PrivateRoute';

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
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path='/' element={<Profile />} />
            <Route
              exact
              path='/connect'
              element={<Connect fbLogin={fbLogin} instaLogin={instaLogin} />}
            />
            <Route
              exact
              path='/timeline'
              element={<Timeline fbLogin={fbLogin} instaLogin={instaLogin} />}
            />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>

    // <div>
    //   <Router>
    //     <NavBar />
    //     <Routes>
    //       <Route
    //         exact
    //         path='/'
    //         element={<Connect fbLogin={fbLogin} instaLogin={instaLogin} />}
    //       />
    //       <Route
    //         exact
    //         path='/timeline'
    //         element={<Timeline fbLogin={fbLogin} instaLogin={instaLogin} />}
    //       />
    //     </Routes>
    //   </Router>
    // </div>
  );
}

export default App;
