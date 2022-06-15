const token = localStorage.getItem('token');

location.href = token ? 'home.html' : 'login.html';