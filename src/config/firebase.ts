import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBG4jOG1OC_mKLiy0T1rLj9tQ_-SyAtxio',
  authDomain: 'cpw1-93d13.firebaseapp.com',
  projectId: 'cpw1-93d13',
  storageBucket: 'cpw1-93d13.appspot.com',
  messagingSenderId: '297778390917',
  appId: '1:297778390917:web:33eee36c517ca7aa8bc6ec',
  measurementId: 'G-D3EFVT8DR7'
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;