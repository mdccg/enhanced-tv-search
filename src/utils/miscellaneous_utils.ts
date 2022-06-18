import { isEmpty } from './string_utils';
import $ from './$';

export const resizeSearchedVideosArea = () => {
  const searchedVideosArea = <HTMLDivElement>$('#searched-videos-area');
  
  const observer = new MutationObserver((_) => {
    const noContent = isEmpty(searchedVideosArea.innerHTML);
    searchedVideosArea.style.display = noContent ? 'none' : 'flex';
  });

  observer.observe(searchedVideosArea, { childList: true });
}