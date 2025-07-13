function login() {
  const user = document.getElementById('username').value.trim();
  if (user) {
    localStorage.setItem('nipobet_user', user);
    localStorage.setItem('nipobet_balance', 1000);
    window.location.href = "apostas.html";
  } else {
    alert("Digite seu nome para continuar.");
  }
}
