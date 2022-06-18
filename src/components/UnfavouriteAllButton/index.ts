import './styles.css';

import { handleNoFavouritedShows } from './../../pages/Favourites';

import { getFavouritedShows } from './../../utils/favourite_utils';
import $ from './../../utils/$';

const handleClick = () => {
  const audio = new Audio();
  audio.src = '/assets/sounds/unfavourited.mp3';
  audio.play();

  localStorage.removeItem('favouritedShows');

  const searchedVideosArea = <HTMLDivElement>$('#searched-videos-area');
  searchedVideosArea.innerHTML = '';

  const favouritedShows = getFavouritedShows();
  let message: string | undefined;
  if (favouritedShows.length === 0) {
    message = `
      P-Pare de apertar o botão apenas para ouvir o barulhinho!<br />
      N-Não vê que todas as estrelinhas já sumiram&hellip;?
    `;
  }
  handleNoFavouritedShows(message);
}

const renderUnfavouriteAllButton = (container: HTMLDivElement) => {
  const htmlContent = `
    <button id="unfavourite-all">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/></svg>
      <span>Desfavoritar tudo</span>
    </button>
  `;

  container.insertAdjacentHTML('beforeend', htmlContent);

  const unfavouriteAll = <HTMLButtonElement>$('#unfavourite-all');
  unfavouriteAll.onclick = () => {
    handleClick();
  }
}

export default renderUnfavouriteAllButton;