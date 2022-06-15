import renderHeader from './components/Header';
import renderHomePage from './pages/Home';
import $ from './utils/$';

const token = localStorage.getItem('token');

if (!token) {
  location.href = 'login.html';
}

const app = <HTMLDivElement>$('#app');

renderHomePage(app);

const home = <HTMLDivElement>$('#home');

renderHeader(home);