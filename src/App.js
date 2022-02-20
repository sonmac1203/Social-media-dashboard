import React from 'react';
import Connect from './components/Connect/Connect';
import Timeline from './components/Timeline/Timeline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Login/Signup';
import { AuthProvider } from './Login/contexts/AuthContext';
import Login from './Login/Login';
import { Profile } from './components/Management/Profile';
import PrivateRoute from './Login/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path='/' element={<Profile />} />
            <Route exact path='/connect' element={<Connect />} />
            <Route exact path='/timeline' element={<Timeline />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
