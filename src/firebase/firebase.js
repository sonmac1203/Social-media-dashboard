import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDl_-SH21KtRpMnjVmiRfdF3iNhZ-R72N8',
  authDomain: 'dashboard-project-c12ed.firebaseapp.com',
  projectId: 'dashboard-project-c12ed',
  storageBucket: 'dashboard-project-c12ed.appspot.com',
  messagingSenderId: '277870782952',
  appId: '1:277870782952:web:797dfbb307bd9e195c9c5d',
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_FIREBASE_APPID,
// };

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
