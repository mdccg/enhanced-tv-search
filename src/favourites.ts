const token = localStorage.getItem('token');

if (!token) {
  location.href = 'login.html';
}

export default {};