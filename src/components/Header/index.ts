import './styles.css';

import renderSearchBar from './../SearchBar';
import renderUserPopup from './../UserPopup';
import $ from './../../utils/$';

const renderHeader = (container: HTMLDivElement) => {
  const htmlContent = `
    <header>
      <hgroup>
        <h1>TV Search</h1>
        <h2>Uma gama de vídeos à sua disposição</h2>
      </hgroup>
    </header>
  `;

  container.insertAdjacentHTML('afterbegin', htmlContent);

  const header = <HTMLDivElement>$('header');
  renderSearchBar(header);
  renderUserPopup(header);
}

export default renderHeader;