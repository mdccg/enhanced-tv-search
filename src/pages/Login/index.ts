import './styles.css';

import renderGoogleLoginButton from './../../components/GoogleLoginButton';
import renderGithubLoginButton from './../../components/GithubLoginButton';
import renderMicrosoftLoginButton from './../../components/MicrosoftLoginButton';
import $ from './../../utils/$';

const initializeCarousel = () => {
  const wallpaper = <HTMLDivElement>$('#wallpaper');
  
  let counter = 2;
  
  const INTERVAL_IN_SECONDS = 3;
  const PHOTOS_TOTAL = 6;

  setInterval(() => {
    wallpaper.style.backgroundImage = `url('/assets/images/wallpaper-${counter}.png')`;
  
    ++counter;
    
    if (counter > PHOTOS_TOTAL) {
      counter = 1;
    }

  }, INTERVAL_IN_SECONDS * 1e3);
}

const renderLoginPage = (container: HTMLDivElement) => {
  const htmlContent = `
    <main class="page" id="login">
      <h1>TV Search</h1>
      <h2>
        Com o TV Search, você pode pesquisar filmes, séries, k-dramas, animes e muito mais 
        a qualquer hora do dia
      </h2>
      <div id="login-buttons"></div>
    </main>
    <div id="gradient"></div>
    <div id="wallpaper"></div>
  `;

  container.innerHTML = htmlContent;

  const loginButtons = <HTMLDivElement>$('#login-buttons');

  renderGoogleLoginButton(loginButtons);
  renderGithubLoginButton(loginButtons);
  renderMicrosoftLoginButton(loginButtons);

  initializeCarousel();
}

export default renderLoginPage;