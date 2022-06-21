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

// https://stackoverflow.com/questions/10593337/is-there-any-way-to-create-mongodb-like-id-strings-without-mongodb
export const ObjectId = (m = Math, d = Date, h = 16, s = (s: any) => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));