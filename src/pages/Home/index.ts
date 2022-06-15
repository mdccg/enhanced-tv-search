import './styles.css';

const renderHomePage = (container: HTMLDivElement) => {
  const htmlContent = `
    <main class="page" id="home">
      <span>Hello</span>
    </main>
  `;

  container.innerHTML = htmlContent;
}

export default renderHomePage;