import renderContentNotFoundPanel, {
  showContentNotFoundPanel,
  hideContentNotFoundPanel
} from './../../components/ContentNotFoundPanel';
import renderUnfavouriteAllButton from './../../components/UnfavouriteAllButton';
import renderTVShowCard from './../../components/TVShowCard';
import renderHeader from './../../components/Header';

import TVShow, { getTVShowById } from './../../models/TVShow';

import { getFavouritedShows, unfavouriteShow } from './../../utils/favourite_utils';
import { resizeSearchedVideosArea } from './../../utils/miscellaneous_utils';
import $ from './../../utils/$';

export const handleNoFavouritedShows = (message?: string) => {
  const ids = getFavouritedShows();

  if (ids.length === 0) {
    showContentNotFoundPanel(message ?? `
      P-Por que você desfavoritou todos os seus shows?<br />
      Eu gostava de ver aquelas estrelas brilhando! Sniff-sniff&hellip;
    `);
  }
}

const renderFavouritedTVShows = async () => {
  hideContentNotFoundPanel();

  const ids = getFavouritedShows();
  
  if (ids.length === 0) {
    showContentNotFoundPanel(`
      Humpf, você ainda não tem nenhum show favorito&hellip;<br />
      Vou contar tudo para a sua mamãe!
    `);
  }
  
  const searchedVideosArea = <HTMLDivElement>$('#searched-videos-area');

  ids.forEach(async (id: string) => {
    const tvShow: TVShow | null = await getTVShowById(id);

    if (tvShow === null) {
      unfavouriteShow(id);
      return;
    }
    
    renderTVShowCard(searchedVideosArea, tvShow, handleNoFavouritedShows);
  });
}

const renderFavouritesPage = (container: HTMLDivElement) => {
  const htmlContent = `
    <main class="page" id="favourites">
      <div id="searched-videos-area"></div>
    </main>
  `;

  container.innerHTML = htmlContent;

  const favouritesPage = <HTMLDivElement>$('#favourites');
  renderHeader(favouritesPage);
  renderContentNotFoundPanel(favouritesPage);
  renderUnfavouriteAllButton(favouritesPage);

  renderFavouritedTVShows();
  
  resizeSearchedVideosArea();
}

export default renderFavouritesPage;