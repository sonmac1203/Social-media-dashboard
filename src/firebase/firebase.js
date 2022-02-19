import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDl_-SH21KtRpMnjVmiRfdF3iNhZ-R72N8',
  authDomain: 'dashboard-project-c12ed.firebaseapp.com',
  projectId: 'dashboard-project-c12ed',
  storageBucket: 'dashboard-project-c12ed.appspot.com',
  messagingSenderId: '277870782952',
  appId: '1:277870782952:web:797dfbb307bd9e195c9c5d',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
