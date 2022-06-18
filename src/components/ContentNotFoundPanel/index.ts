import './styles.css';

import $ from './../../utils/$';

export const showContentNotFoundPanel = (message?: string, happy?: boolean) => {
  const contentNotFoundPanel = <HTMLDivElement>$('#content-not-found-panel');
  contentNotFoundPanel.style.display = 'flex';

  if (message) { 
    const spanContentNotFoundPanel = <HTMLSpanElement>$('#content-not-found-panel > span');
    spanContentNotFoundPanel.innerHTML = message;
  }

  if (happy) {
    const imgContentNotFoundPanel = <HTMLImageElement>$('#content-not-found-panel > img');
    imgContentNotFoundPanel.src = '/assets/icons/happy.svg';
  }
}

export const hideContentNotFoundPanel = () => {
  const contentNotFoundPanel = <HTMLDivElement>$('#content-not-found-panel');
  contentNotFoundPanel.style.display = 'none';
}

const renderContentNotFoundPanel = (container: HTMLDivElement) => {
  const htmlContent = `
    <div class="showup-panel" id="content-not-found-panel">
      <img src="/assets/icons/sad.svg" alt="Triste" />
      <span>Foo bar</span>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', htmlContent);
}

export default renderContentNotFoundPanel;