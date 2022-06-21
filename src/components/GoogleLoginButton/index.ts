import toast from './../Toast';
import firebaseApp from './../../config/firebase';
import { getErrorMessages } from './../../utils/auth_utils';
import $ from './../../utils/$';

import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthCredential } from 'firebase/auth';

const handleClick = () => {
  const auth = getAuth(firebaseApp);
  auth.languageCode = 'pt_BR';

  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = <OAuthCredential>GoogleAuthProvider.credentialFromResult(result);
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

const renderGoogleLoginButton = (container: HTMLDivElement) => {
  const htmlContent = `
    <button class="login-button" id="google-login-button">
      <img src="/assets/icons/google.svg" alt="Google" />
      <span>Entrar com Google</span>
    </button>
  `;

  container.insertAdjacentHTML('beforeend', htmlContent);

  const googleLoginButton = <HTMLButtonElement>$('#google-login-button');
  googleLoginButton.onclick = handleClick;
}

export default renderGoogleLoginButton;