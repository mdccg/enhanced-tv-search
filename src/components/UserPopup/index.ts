import './styles.css';

import { getUser } from './../../utils/auth_utils';
import $ from './../../utils/$';

const loadAlternativePhoto = (photoURL: string) => {
  const image = new Image();
  image.src = photoURL;

  const alternativePhoto = '/assets/icons/user.svg';

  image.onerror = () => {
    const headerUserPhoto = <HTMLImageElement>$('#header-user-photo');
    const userPopupPhoto = <HTMLImageElement>$('#user-popup img');
    
    headerUserPhoto.src = alternativePhoto;
    userPopupPhoto.src = alternativePhoto;
  }  
}

const setUserPopup = () => {
  const app = <HTMLDivElement>$('#app');
  const userPopup = <HTMLDivElement>$('#user-popup');

  app.onclick = (event: MouseEvent) => {
    const { id } = <HTMLDivElement>event.target;
    
    if (id !== 'user-popup') {
      userPopup.style.display = 'none';
    }

    if (id === 'header-user-photo') {
      userPopup.style.display = 'flex';
    }
  }
}

const renderCheck = (emailVerified: boolean) => {
  const checkIcon = <SVGAElement>$('#check-icon');
  checkIcon.style.display = emailVerified ? 'block' : 'none';
}

const renderUserPopup = (container: HTMLDivElement) => {
  const user = getUser();

  const { displayName, email, emailVerified, phoneNumber, photoURL } = user;

  const htmlContent = `
    <div id="user-popup-area">
      <img id="header-user-photo" src="${photoURL}" alt="Foto de perfil de ${displayName}" />

      <div id="user-popup">
        <img src="${photoURL}" alt="Foto de perfil de ${displayName}" />

        <span id="display-name">${displayName}</span>

        <div id="email">
          <span>${email}</span>
          <svg id="check-icon" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M6.26701 3.45496C6.91008 3.40364 7.52057 3.15077 8.01158 2.73234C9.15738 1.75589 10.8426 1.75589 11.9884 2.73234C12.4794 3.15077 13.0899 3.40364 13.733 3.45496C15.2336 3.57471 16.4253 4.76636 16.545 6.26701C16.5964 6.91008 16.8492 7.52057 17.2677 8.01158C18.2441 9.15738 18.2441 10.8426 17.2677 11.9884C16.8492 12.4794 16.5964 13.0899 16.545 13.733C16.4253 15.2336 15.2336 16.4253 13.733 16.545C13.0899 16.5964 12.4794 16.8492 11.9884 17.2677C10.8426 18.2441 9.15738 18.2441 8.01158 17.2677C7.52057 16.8492 6.91008 16.5964 6.26701 16.545C4.76636 16.4253 3.57471 15.2336 3.45496 13.733C3.40364 13.0899 3.15077 12.4794 2.73234 11.9884C1.75589 10.8426 1.75589 9.15738 2.73234 8.01158C3.15077 7.52057 3.40364 6.91008 3.45496 6.26701C3.57471 4.76636 4.76636 3.57471 6.26701 3.45496ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z" fill-rule="evenodd"/></svg>
        </div>

        <hr />
        
        <div id="phone-number">
          <svg id="phone-number-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z"/></svg>
          <span>${phoneNumber ?? 'Indisponível'}</span>
        </div>

        <hr />

        <a href="logout.html" id="logout-link">Desconectar</a>
      </div>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', htmlContent);

  loadAlternativePhoto(`${photoURL}`);
  renderCheck(emailVerified);
  setUserPopup();
}

export default renderUserPopup;