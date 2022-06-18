import './styles.css';

import renderSearchBar from './../SearchBar';
import renderUserPopup from './../UserPopup';
import $ from './../../utils/$';

const resizeHeader = () => {
  const header = <HTMLDivElement>$('header');
  const headerHitbox = <HTMLDivElement>$('#header-hitbox');
  headerHitbox.style.height = `${header.offsetHeight}px`;
}

const detectResize = () => {
  const body = <HTMLBodyElement>$('body');

  body.onresize = () => {
    resizeHeader();
  }

  body.onkeydown = (event: KeyboardEvent) => {
    if (event.key === 'F12') {
      resizeHeader();
    }
  }
}

const renderHeader = (container: HTMLDivElement) => {
  const htmlContent = `
    <header>
      <hgroup>
        <a href="home.html">
          <h1>TV Search</h1>
          <h2>Uma gama de shows à sua disposição</h2>
        </a>
      </hgroup>
    </header>
    <div id="header-hitbox"></div>
  `;

  container.insertAdjacentHTML('afterbegin', htmlContent);

  const header = <HTMLDivElement>$('header');
  renderSearchBar(header);
  renderUserPopup(header);

  resizeHeader();
  detectResize();
}

export default renderHeader;