import './styles.css';

import renderHeader from './../../components/Header';
import renderTVShowCard from './../../components/TVShowCard';
import renderLoadingPanel, {
  hideLoadingPanel,
  showLoadingPanel
} from './../../components/LoadingPanel';
import renderContentNotFoundPanel, {
  hideContentNotFoundPanel,
  showContentNotFoundPanel
} from './../../components/ContentNotFoundPanel';

import TVShow, { parseTVShow } from './../../models/TVShow';

import api from './../../services/api';

import { resizeSearchedVideosArea } from './../../utils/miscellaneous_utils';
import { isEmpty } from './../../utils/string_utils';
import $ from './../../utils/$';

import { AxiosRequestConfig } from 'axios';

const searchVideos = () => {
  hideContentNotFoundPanel();
  
  const params = new URLSearchParams(location.search);
  const search = params.get('search');
  
  if (isEmpty(search)) {
    showContentNotFoundPanel(`
      Que prazer tê-lo(a) em minha página!<br />
      Experimente pesquisar alguma coisa&hellip;
    `, true);
    return;
  }

  document.title = search + ' • TV Search';

  showLoadingPanel();

  const config: AxiosRequestConfig = {
    params: {
      q: search
    }
  };

  api.get('/search/shows', config)
    .then((response) => {
      const { data: jsonObjects } = response;

      if (jsonObjects.length === 0) {
        showContentNotFoundPanel(`
          Oh, céus! Não encontramos nenhum programa de TV<br />
          com o nome "${search}"&hellip;
        `);
      }

      const tvShows = jsonObjects.map((jsonObject: any) => {
        return parseTVShow(jsonObject.show);
      });

      const searchedVideosArea = <HTMLDivElement>$('#searched-videos-area');

      tvShows.forEach((tvShow: TVShow) => {
        renderTVShowCard(searchedVideosArea, tvShow);
      });
    })
    .catch((error) => console.error(error))
    .finally(() => {
      hideLoadingPanel();
    });
}

const renderHomePage = (container: HTMLDivElement) => {
  const htmlContent = `
    <main class="page" id="home">
      <div id="searched-videos-area"></div>
    </main>
  `;

  container.innerHTML = htmlContent;

  const home = <HTMLDivElement>$('#home');
  renderHeader(home);
  renderLoadingPanel(home);
  renderContentNotFoundPanel(home);

  searchVideos();

  resizeSearchedVideosArea();
}

export default renderHomePage;