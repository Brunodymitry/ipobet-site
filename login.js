function login() {
  const username = document.getElementById('username').value;
  if (!username) {
    alert("Digite seu nome!");
    return;
  }
  localStorage.setItem('username', username);
  localStorage.setItem('saldo', '1000');
  window.location.href = 'apostas.html';
}
