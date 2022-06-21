import './styles.css';

import TVShow from './../../models/TVShow';

import {
  favouriteShow,
  unfavouriteShow,
  isFavourited,
  favouritedIcon,
  unFavouritedIcon
} from './../../utils/favourite_utils';
import { getFormattedGenres, getTranslatedType } from './../../utils/string_utils';
import { parseStringDate } from './../../utils/date_utils';
import $ from './../../utils/$';

const handleFavourite = (
  id: string,
  thisId: string,
  favourited: boolean,
  handleNoFavouritedShows: (() => void) | undefined
) => {
  const showFavouriteIcon = <HTMLDivElement>$(`#${thisId} .show-favourite-icon`);
  showFavouriteIcon.onclick = (event: MouseEvent) => {
    event.preventDefault();
    
    favourited = !favourited;
    
    let audio;

    if (favourited) {
      favouriteShow(id);
      showFavouriteIcon.innerHTML = favouritedIcon;
      audio = new Audio('/assets/sounds/favourited.mp3');
    } else {
      unfavouriteShow(id);
      showFavouriteIcon.innerHTML = unFavouritedIcon;
      audio = new Audio('/assets/sounds/unfavourited.mp3');

      if (location.pathname === '/favourites.html') {
        const thisDiv = (<HTMLDivElement>$(`#${thisId}`)).parentElement;
        thisDiv?.remove();

        if (handleNoFavouritedShows) {
          handleNoFavouritedShows();
        }
      }
    }
    
    audio.play();
  }
}

const renderTVShowCard = (
  container: HTMLDivElement,
  tvShow: TVShow,
  handleNoFavouritedShows?: () => void
) => {
  const { name, type, genres, thumbnailUrl } = tvShow;
  
  const id = `${tvShow.id}`;
  const thisId = `tv-show-card-${id}`;

  const translatedType = getTranslatedType(type);
  const formattedGenres = getFormattedGenres(genres);
  const premieredDate = parseStringDate(tvShow.premieredDate);
  
  let favourited = isFavourited(id);

  const htmlContent = `
    <div class="tv-show-card-area">
      <a class="tv-show-card" id="${thisId}" href="tv-show.html?id=${id}">
      
        ${thumbnailUrl ? `
          <img src="${thumbnailUrl}" alt="Capa de ${name}" />
        ` : `
          <div class="image-not-found">
            <svg class="television-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><path d="M19,6H14.41l2.3-2.29a1,1,0,1,0-1.42-1.42L12,5.59,8.71,2.29A1,1,0,1,0,7.29,3.71L9.59,6H5A3,3,0,0,0,2,9V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V9A3,3,0,0,0,19,6ZM16,16a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V10A2,2,0,0,1,6,8h8a2,2,0,0,1,2,2Zm3,3a1,1,0,1,1,1-1A1,1,0,0,1,19,19Zm0-4a1,1,0,1,1,1-1A1,1,0,0,1,19,15Zm0-4a1,1,0,1,1,1-1A1,1,0,0,1,19,11Z" /></svg>
          </div>
        `}

        <div class="tv-show-details">
          <div class="tv-show-details-header">
            <span class="show-type">${translatedType}</span>
            <div class="show-favourite-icon">
              ${favourited ? favouritedIcon : unFavouritedIcon}
            </div>
          </div>
          <span class="show-name">${name}</span>
          ${genres.length !== 0 ? `
            <span class="show-genres">
              <b>Gêneros:</b> ${formattedGenres}
            </span>
          ` : ''}
          <span class="show-premiered-date">
            <b>Data de estreia:</b> ${premieredDate ?? 'Indisponível'}
          </span>
        </div>
      </a>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', htmlContent);

  handleFavourite(id, thisId, favourited, handleNoFavouritedShows);
}

export default renderTVShowCard;