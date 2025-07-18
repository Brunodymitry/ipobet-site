document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username') || 'Convidado';
  let saldo = parseFloat(localStorage.getItem('saldo')) || 1000;
  document.getElementById('username').textContent = username;
  document.getElementById('saldo').textContent = saldo.toFixed(2);

  const jogos = [
    { equipes: ['Flamengo', 'Palmeiras'], data: '2025-07-20 18:00', odds: [1.8, 3.2, 2.5] },
    { equipes: ['São Paulo', 'Corinthians'], data: '2025-07-21 20:30', odds: [2.0, 3.0, 2.8] },
    { equipes: ['Grêmio', 'Internacional'], data: '2025-07-22 21:00', odds: [2.2, 3.1, 2.0] }
  ];

  const container = document.getElementById('jogos');
  container.innerHTML = '';

  jogos.forEach(jogo => {
    const card = document.createElement('div');
    card.className = 'jogo';
    card.innerHTML = `
      <h3>${jogo.equipes[0]} vs ${jogo.equipes[1]}</h3>
      <p><strong>Data:</strong> ${jogo.data}</p>
      <div class="botoes">
        <button onclick="apostar('${jogo.equipes[0]}', ${jogo.odds[0]})">${jogo.equipes[0]} - ${jogo.odds[0]}</button>
        <button onclick="apostar('Empate', ${jogo.odds[1]})">Empate - ${jogo.odds[1]}</button>
        <button onclick="apostar('${jogo.equipes[1]}', ${jogo.odds[2]})">${jogo.equipes[1]} - ${jogo.odds[2]}</button>
      </div>
    `;
    container.appendChild(card);
  });
});

function apostar(time, odd) {
  const valor = parseFloat(prompt(`Quanto deseja apostar em ${time}?`));
  if (isNaN(valor) || valor <= 0) return alert("Valor inválido.");
  let saldoAtual = parseFloat(localStorage.getItem('saldo')) || 0;
  if (valor > saldoAtual) return alert("Saldo insuficiente.");

  saldoAtual -= valor;
  localStorage.setItem('saldo', saldoAtual.toFixed(2));
  document.getElementById('saldo').textContent = saldoAtual.toFixed(2);

  alert(`Aposta feita: ${valor} Nips em ${time} (odd ${odd})`);
}
