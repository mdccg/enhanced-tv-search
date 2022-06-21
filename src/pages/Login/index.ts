import './styles.css';

import renderGoogleLoginButton from './../../components/GoogleLoginButton';
import renderGithubLoginButton from './../../components/GithubLoginButton';
import renderMicrosoftLoginButton from './../../components/MicrosoftLoginButton';

import $ from './../../utils/$';

const preloadWallpapers = (totalWallpapers: number) => {
  const head = <HTMLHeadElement>$('head');

  for (let counter = 1; counter <= totalWallpapers; ++counter) {
    const htmlContent = `
      <link rel="preload" as="image" href="/assets/images/wallpaper-${counter}.png" />
    `;

    head.insertAdjacentHTML('beforeend', htmlContent);
  }
}

const setWallpapers = (totalWallpapers: number) => {
  const wallpapers = <HTMLDivElement>$('#wallpapers');
  
  for (let counter = totalWallpapers; counter >= 1; --counter) {
    const htmlContent = `
      <img
        src="/assets/images/wallpaper-${counter}.png"
        alt="Plano de fundo"
        class="wallpaper" />
    `;

    wallpapers.insertAdjacentHTML('beforeend', htmlContent);
  }
}

const initializeCarousel = (seconds = 3) => {
  const wallpaperArray = <NodeListOf<HTMLImageElement>>document.querySelectorAll('.wallpaper');
  let counter = 0;
  
  setInterval(() => {
    const wallpaper = <HTMLImageElement>wallpaperArray[wallpaperArray.length - 1 - counter];
    wallpaperArray.forEach((wallpaper) => wallpaper.style.opacity = '0');
    wallpaper.style.opacity = '1';
    
    ++counter;

    if (counter === wallpaperArray.length) {
      counter = 0;
    }
  }, seconds * 1000);
}

const renderLoginPage = (container: HTMLDivElement) => {
  const htmlContent = `
    <main class="page" id="login">
      <div id="toast-area"></div>
      <h1>TV Search</h1>
      <h2>
        Com o TV Search, você pode pesquisar filmes, séries, k-dramas, animes e muito mais 
        a qualquer hora do dia
      </h2>
      <div id="login-buttons"></div>
    </main>
    <div id="gradient"></div>
    <div id="wallpapers"></div>
    <footer>
      <a href="terms-of-use.html">Termos de uso</a>
    </footer>
  `;

  container.innerHTML = htmlContent;

  const loginButtons = <HTMLDivElement>$('#login-buttons');

  renderGoogleLoginButton(loginButtons);
  renderGithubLoginButton(loginButtons);
  renderMicrosoftLoginButton(loginButtons);

  const totalWallpapers = 6;
  
  preloadWallpapers(totalWallpapers);
  setWallpapers(totalWallpapers);
  initializeCarousel();
}

export default renderLoginPage;