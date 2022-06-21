import toast from './../Toast';
import firebaseApp from './../../config/firebase';
import { getErrorMessages } from './../../utils/auth_utils';
import $ from './../../utils/$';

import { getAuth, signInWithPopup, GithubAuthProvider, OAuthCredential } from 'firebase/auth';

const handleClick = () => {
  const auth = getAuth(firebaseApp);

  const provider = new GithubAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = <OAuthCredential>GithubAuthProvider.credentialFromResult(result);
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

const renderGithubLoginButton = (container: HTMLDivElement) => {
  const htmlContent = `
    <button class="login-button" id="github-login-button">
      <img src="/assets/icons/github.svg" alt="GitHub" />
      <span>Entrar com GitHub</span>
    </button>
  `;

  container.insertAdjacentHTML('beforeend', htmlContent);

  const githubLoginButton = <HTMLButtonElement>$('#github-login-button');
  githubLoginButton.onclick = handleClick;
}

export default renderGithubLoginButton;