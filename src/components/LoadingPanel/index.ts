import $ from './../../utils/$';

const defaultMessage = 'Aguarde enquanto roubamos seus da&mdash;<br />'
  + 'quer dizer, enquanto carregamos as próximas informações&hellip;';

export const showLoadingPanel = (message?: string) => {
  const loadingPanel = <HTMLDivElement>$('#loading-panel');
  loadingPanel.style.display = 'flex';

  if (message) { 
    const spanLoadingPanel = <HTMLSpanElement>$('#loading-panel > span');
    spanLoadingPanel.innerHTML = message;
  }
}

export const hideLoadingPanel = () => {
  const loadingPanel = <HTMLDivElement>$('#loading-panel');
  loadingPanel.style.display = 'none';
}

const renderLoadingPanel = (container: HTMLDivElement) => {
  const htmlContent = `
    <div class="showup-panel" id="loading-panel">
      <img src="/assets/icons/come-come.svg" alt="Carregando..." />
      <span>${defaultMessage}</span>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', htmlContent);
}

export default renderLoadingPanel;