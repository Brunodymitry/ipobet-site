document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username') || "Convidado";
  let saldo = parseFloat(localStorage.getItem('saldo')) || 1000;
  document.getElementById('username').textContent = username;
  document.getElementById('saldo').textContent = saldo.toFixed(2);

  const jogos = [
    {
      equipes: ["Flamengo", "Palmeiras"],
      data: "2025-07-20T20:00:00",
      odds: [2.1, 3.3, 3.0] // casa, empate, fora
    },
    {
      equipes: ["Corinthians", "São Paulo"],
      data: "2025-07-21T18:30:00",
      odds: [2.5, 3.0, 2.8]
    },
    {
      equipes: ["Grêmio", "Internacional"],
      data: "2025-07-22T19:00:00",
      odds: [2.9, 2.9, 2.9]
    }
  ];

  const jogosContainer = document.getElementById('jogos');
  jogosContainer.innerHTML = "";

  jogos.forEach(jogo => {
    const hora = new Date(jogo.data).toLocaleString();
    const card = document.createElement('div');
    card.className = 'jogo';
    card.innerHTML = `
      <h3>${jogo.equipes[0]} vs ${jogo.equipes[1]}</h3>
      <p><strong>Data:</strong> ${hora}</p>
      <div class="botoes">
        <button onclick="apostar('${jogo.equipes[0]}', ${jogo.odds[0]})">${jogo.equipes[0]} - ${jogo.odds[0]}</button>
        <button onclick="apostar('Empate', ${jogo.odds[1]})">Empate - ${jogo.odds[1]}</button>
        <button onclick="apostar('${jogo.equipes[1]}', ${jogo.odds[2]})">${jogo.equipes[1]} - ${jogo.odds[2]}</button>
      </div>
    `;
    jogosContainer.appendChild(card);
  });
});

function apostar(time, odd) {
  const valor = parseFloat(prompt(`Quanto deseja apostar em ${time}?`));
  let saldoAtual = parseFloat(localStorage.getItem('saldo')) || 0;

  if (isNaN(valor) || valor <= 0) {
    alert("Valor inválido.");
    return;
  }

  if (valor > saldoAtual) {
    alert("Saldo insuficiente.");
    return;
  }

  saldoAtual -= valor;
  localStorage.setItem('saldo', saldoAtual.toFixed(2));
  document.getElementById('saldo').textContent = saldoAtual.toFixed(2);

  alert(`Aposta confirmada!\n${valor} Nips em ${time} (odd ${odd})`);
}
