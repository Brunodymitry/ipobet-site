function login() {
  const nome = document.getElementById('username').value;
  if (!nome.trim()) {
    alert("Digite um nome válido!");
    return;
  }
  localStorage.setItem('username', nome);
  localStorage.setItem('saldo', 1000);
  window.location.href = "apostas.html";
}