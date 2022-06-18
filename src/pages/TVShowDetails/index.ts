import './styles.css';

import renderContentNotFoundPanel, { hideContentNotFoundPanel } from './../../components/ContentNotFoundPanel';
import renderLoadingPanel, { hideLoadingPanel, showLoadingPanel } from '../../components/LoadingPanel';
import renderHeader from './../../components/Header';

import TVShow, { parseTVShow } from './../../models/TVShow';

import { types as jsonTypes, genres as jsonGenres } from './../../translations/dict.json';

import { isEmpty } from './../../utils/string_utils';
import $ from './../../utils/$';

import api from './../../services/api';

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

  const { id, name, type, language, genres, isRunning, premieredDate, imageUrl, thumbnailUrl, channel } = tvShow;

  const translatedType = (<any>jsonTypes)[type] ?? type;
  const translatedGenres = genres.map((genre) => (<any>jsonGenres)[genre] ?? genre);

  const htmlContent = `
    <div id="tv-show">
      <img id="tv-show-banner" src="${imageUrl}" alt="Capa de ${name}" />
      <div id="tv-show-details">
        <span id="name">${name}</span>
      </div>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', htmlContent);
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