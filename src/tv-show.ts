import renderTVShowDetails from './pages/TVShowDetails';
import $ from './utils/$';

const token = localStorage.getItem('token');

if (!token) {
  location.href = 'login.html';
}

const app = <HTMLDivElement>$('#app');
renderTVShowDetails(app);