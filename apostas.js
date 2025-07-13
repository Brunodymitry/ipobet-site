document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("nipobet_user");
  const saldo = localStorage.getItem("nipobet_balance");
  document.getElementById("username").textContent = user;
  document.getElementById("saldo").textContent = saldo;
  // Exemplo: jogos mockados
  document.getElementById("jogos-container").innerHTML = `
    <div>
      <p>Flamengo x Palmeiras - 15/07/2025 - 18:00</p>
      <button onclick="apostar('Flamengo', 2.1)">Apostar Flamengo</button>
      <button onclick="apostar('Palmeiras', 2.5)">Apostar Palmeiras</button>
    </div>
  `;
});
function apostar(time, odd) {
  const valor = prompt("Quanto quer apostar?");
  const saldoAtual = parseFloat(localStorage.getItem("nipobet_balance"));
  if (valor && !isNaN(valor) && valor > 0 && valor <= saldoAtual) {
    const novoSaldo = saldoAtual - valor;
    localStorage.setItem("nipobet_balance", novoSaldo);
    alert("Aposta em " + time + " feita com odd " + odd + "!");
    location.reload();
  } else {
    alert("Aposta inválida.");
  }
}
