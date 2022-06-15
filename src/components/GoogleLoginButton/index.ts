import firebaseApp from './../../config/firebase';
import $ from './../../utils/$';

import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthCredential } from "firebase/auth";

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
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.error(errorCode);
      console.error(errorMessage);
      console.error(email);
      console.error(credential);
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