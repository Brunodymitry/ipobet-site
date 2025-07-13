function login() {
  const user = document.getElementById('username').value;
  if (user) {
    localStorage.setItem('nipobet_user', user);
    localStorage.setItem('nipobet_balance', 1000); // saldo inicial
    window.location.href = "apostas.html";
  }
}
