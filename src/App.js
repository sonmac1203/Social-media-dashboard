import React from 'react';
import Connect from './Connect/Connect';
import Timeline from './Timeline/Timeline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Login/Signup';
import { AuthProvider } from './Login/AuthContext';
import Login from './Login/Login';
import { Profile } from './Management/Profile';
import PrivateRoute from './Login/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/connect' element={<Connect />} />
            <Route exact path='/' element={<Timeline />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
