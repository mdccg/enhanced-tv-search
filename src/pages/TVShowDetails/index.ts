import './styles.css';

import renderContentNotFoundPanel, { hideContentNotFoundPanel } from './../../components/ContentNotFoundPanel';
import renderLoadingPanel, { hideLoadingPanel, showLoadingPanel } from './../../components/LoadingPanel';
import renderHeader from './../../components/Header';

import TVShow, { parseTVShow } from './../../models/TVShow';

import {
  favouriteShow,
  unfavouriteShow,
  isFavourited,
  favouritedIcon,
  unFavouritedIcon
} from './../../utils/favourite_utils';
import {
  isEmpty,
  getTranslatedType,
  getFormattedGenres,
  getTranslatedLanguage
} from './../../utils/string_utils';
import { parseStringDate } from './../../utils/date_utils';
import $ from './../../utils/$';

import api from './../../services/api';

const handleClickBackButton = () => {
  history.back();
}

const updateTypeIcon = (type: string) => {
  const suffix = '/assets/icons/';

  const icons: any = {
    "Animation":   suffix + 'film-solid.svg', 
    "Documentary": suffix + 'newspaper-solid.svg', 
    "News":        suffix + 'book-solid.svg', 
    "Reality":     suffix + 'video-solid.svg', 
    "Panel":       suffix + 'person-circle-question.svg', 
    "Scripted":    suffix + 'scroll-solid.svg', 
    "Sports":      suffix + 'volleyball-solid.svg', 
    "Variety":     suffix + 'dice-solid.svg'
  };

  const typeIcon = <HTMLImageElement>$('#type-icon');

  if (icons[type]) {
    typeIcon.src = icons[type];
  }
}

const getTVShowDetails = async (): Promise<TVShow | undefined> => {
  hideContentNotFoundPanel();
  
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  
  if (isEmpty(id)) {
    return;
  }

  showLoadingPanel();

  const response = await api.get(`/shows/${id}`);
  const tvShow: TVShow = parseTVShow(response.data);

  hideLoadingPanel();

  return tvShow;
}

const renderTVShowDetails = async (container: HTMLDivElement) => {
  const tvShow = await getTVShowDetails();

  if (!tvShow) {
    location.href = 'index.html';
    return;
  }

  const { id, name, type, language, genres, isRunning, premieredDate, imageUrl, channel } = tvShow;

  document.title = name + ' • TV Search';

  const translatedType = getTranslatedType(type);
  const formattedGenres = getFormattedGenres(genres);
  const translatedLanguage = await getTranslatedLanguage(language);

  let favourited = isFavourited(id);

  const htmlContent = `
  
    <div id="tv-show">
      <div id="tv-show-banner">
        <button id="back-button">
          <img src="/assets/icons/arrow-left-solid.svg" alt="Voltar" />
        </button>
        
        ${imageUrl ? `
          <img src="${imageUrl}" alt="Capa de ${name}" />
        ` : `
          <div class="image-not-found">
            <svg class="television-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><path d="M19,6H14.41l2.3-2.29a1,1,0,1,0-1.42-1.42L12,5.59,8.71,2.29A1,1,0,1,0,7.29,3.71L9.59,6H5A3,3,0,0,0,2,9V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V9A3,3,0,0,0,19,6ZM16,16a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V10A2,2,0,0,1,6,8h8a2,2,0,0,1,2,2Zm3,3a1,1,0,1,1,1-1A1,1,0,0,1,19,19Zm0-4a1,1,0,1,1,1-1A1,1,0,0,1,19,15Zm0-4a1,1,0,1,1,1-1A1,1,0,0,1,19,11Z" /></svg>
          </div>
        `}
      </div>
      
      <div id="tv-show-details">
        <div id="name">
          <span>${name}</span>
          <div id="favourite-icon">
            ${favourited ? favouritedIcon : unFavouritedIcon}
          </div>
        </div>
        
        ${genres.length > 0 ? `
          <div class="data">
            <img src="/assets/icons/suits.svg" alt="Gêneros" />
            <span>${formattedGenres}</span>
          </div>
        ` : ''}

        <div class="data">
          <img id="type-icon" src="/assets/icons/video-solid.svg" alt="Categoria" />
          <span>${translatedType}</span>
        </div>

        <div class="data">
          <img src="/assets/icons/earth-americas-solid.svg" alt="Idioma" />
          <span>${translatedLanguage}</span>
        </div>

        <div class="data">
          <img src="/assets/icons/clapperboard-solid.svg" alt="Andamento do show de TV" />
          <span>${isRunning ? 'Em lançamento' : 'Finalizada'}</span>
        </div>

        <div class="data">
          <img src="/assets/icons/baby-carriage-solid.svg" alt="Data de estreia" />
          <span>${parseStringDate(premieredDate) ?? 'Data de estreia indisponível'}</span>
        </div>

        <div class="data">
          <img src="/assets/icons/tower-broadcast-solid.svg" alt="Canal de streaming" />
          <span>${channel}</span>
        </div>
      </div>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', htmlContent);

  const backButton = <HTMLButtonElement>$('#back-button');
  const shiningStar = <HTMLDivElement>$('#favourite-icon');
  shiningStar.style.fill = favourited ? 'var(--sun-flower)' : 'var(--fuel-town)';

  backButton.onclick = () => handleClickBackButton();
  shiningStar.onclick = () => {
    favourited = !favourited;
    let audio;
    
    if (favourited) {
      favouriteShow(id);
      shiningStar.innerHTML = favouritedIcon;
      shiningStar.style.fill = 'var(--sun-flower)';
      audio = new Audio('/assets/sounds/favourited.mp3');
    } else {
      unfavouriteShow(id);
      shiningStar.innerHTML = unFavouritedIcon;
      shiningStar.style.fill = 'var(--fuel-town)';
      audio = new Audio('/assets/sounds/unfavourited.mp3');
    }
    
    audio.play();
  }
  updateTypeIcon(type);
}

const renderTVShowDetailsPage = (container: HTMLDivElement) => {
  const htmlContent = `
    <main class="page" id="tv-show-details-page"></main>
  `;

  container.innerHTML = htmlContent;

  const tvShowDetailsPage = <HTMLDivElement>$('#tv-show-details-page');
  renderHeader(tvShowDetailsPage);
  renderLoadingPanel(tvShowDetailsPage);
  renderContentNotFoundPanel(tvShowDetailsPage);

  renderTVShowDetails(tvShowDetailsPage);
}

export default renderTVShowDetailsPage;