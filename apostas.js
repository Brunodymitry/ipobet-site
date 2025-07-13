document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("nipobet_user");
  const saldo = parseFloat(localStorage.getItem("nipobet_balance") || 0);
  document.getElementById("username").textContent = user;
  document.getElementById("saldo").textContent = saldo.toFixed(2);

  const jogos = [
    { id: 1, jogo: "Flamengo x Palmeiras", data: "15/07/2025 18:00", odd1: 2.1, odd2: 2.5 },
    { id: 2, jogo: "Corinthians x São Paulo", data: "16/07/2025 20:30", odd1: 2.3, odd2: 2.2 },
    { id: 3, jogo: "Grêmio x Vasco", data: "17/07/2025 19:00", odd1: 2.6, odd2: 2.7 }
  ];

  const form = document.getElementById("apostas-form");
  jogos.forEach(j => {
    form.innerHTML += `
      <div class="game">
        <p><strong>${j.jogo}</strong><br><small>${j.data}</small></p>
        <label><input type="radio" name="jogo${j.id}" value="${j.odd1}"> Time 1 (Odd: ${j.odd1})</label>
        <label><input type="radio" name="jogo${j.id}" value="${j.odd2}"> Time 2 (Odd: ${j.odd2})</label><br>
        Valor: <input type="number" id="valor${j.id}" min="0" value="0">
      </div>
    `;
  });
});

function fazerApostas() {
  let saldo = parseFloat(localStorage.getItem("nipobet_balance") || 0);
  let totalAposta = 0;
  let ganhosPotenciais = 0;

  for (let i = 1; i <= 3; i++) {
    const valor = parseFloat(document.getElementById("valor" + i).value || 0);
    const opcao = document.querySelector("input[name='jogo" + i + "']:checked");
    if (valor > 0 && opcao) {
      totalAposta += valor;
      ganhosPotenciais += valor * parseFloat(opcao.value);
    }
  }

  if (totalAposta === 0) {
    alert("Escolha ao menos uma aposta.");
    return;
  }

  if (totalAposta > saldo) {
    alert("Saldo insuficiente.");
    return;
  }

  saldo -= totalAposta;
  localStorage.setItem("nipobet_balance", saldo.toFixed(2));
  alert(`Apostas feitas com sucesso!
Total apostado: ${totalAposta} Nips
Possível retorno: ${ganhosPotenciais.toFixed(2)} Nips`);
  location.reload();
}
