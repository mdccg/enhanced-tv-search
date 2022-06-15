import firebaseApp from './config/firebase';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(firebaseApp);

signOut(auth)
  .then((_) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    location.href = 'login.html';
  })
  .catch(error => console.error(error));