import toast from './../Toast';
import firebaseApp from './../../config/firebase';
import { getErrorMessages } from './../../utils/auth_utils';
import $ from './../../utils/$';

import { getAuth, signInWithPopup, OAuthProvider, OAuthCredential } from 'firebase/auth';

const handleClick = () => {
  const auth = getAuth(firebaseApp);

  const provider = new OAuthProvider('microsoft.com');

  provider.setCustomParameters({ tenant: '8497e355-02b9-4a18-a664-c67e60c2563c' });

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = <OAuthCredential>OAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      localStorage.setItem('token', `${token}`);
      localStorage.setItem('user', JSON.stringify(user.toJSON()));

      location.href = 'home.html';
      
    }).catch((error) => {
      const errorCode = error.code;

      toast.error(getErrorMessages(errorCode));
    });
}

const renderMicrosoftLoginButton = (container: HTMLDivElement) => {
  const htmlContent = `
    <button class="login-button" id="microsoft-login-button">
      <img src="/assets/icons/microsoft.svg" alt="Microsoft" />
      <span>Entrar com Microsoft</span>
    </button>
  `;

  container.insertAdjacentHTML('beforeend', htmlContent);

  const microsoftLoginButton = <HTMLButtonElement>$('#microsoft-login-button');
  microsoftLoginButton.onclick = handleClick;
}

export default renderMicrosoftLoginButton;