import renderLoadingPanel, { showLoadingPanel } from './components/LoadingPanel';
import firebaseApp from './config/firebase';
import $ from './utils/$';

import { getAuth, signOut } from 'firebase/auth';

const app = <HTMLDivElement>$('#app');
renderLoadingPanel(app);
showLoadingPanel(`
  Limpando a sua sujeir&dash;<br />
  quer dizer, removendo as suas credenciais&hellip;
`);

const auth = getAuth(firebaseApp);

signOut(auth)
  .then((_) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    location.href = 'login.html';
  })
  .catch(error => console.error(error));