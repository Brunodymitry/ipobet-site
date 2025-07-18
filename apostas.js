document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username') || "Convidado";
  let saldo = parseFloat(localStorage.getItem('saldo')) || 1000;
  document.getElementById('username').textContent = username;
  document.getElementById('saldo').textContent = saldo.toFixed(2);

  const jogosContainer = document.getElementById('jogos');
  jogosContainer.innerHTML = "<p>Carregando jogos...</p>";

  // Lista simulada de jogos
  const jogos = [
    {
      equipes: ["Real Madrid", "Barcelona"],
      horario: "2025-07-20T18:00:00Z",
      odds: [2.10, 3.20, 2.80]
    },
    {
      equipes: ["Manchester City", "Liverpool"],
      horario: "2025-07-21T16:30:00Z",
      odds: [2.40, 3.00, 2.90]
    },
    {
      equipes: ["PSG", "Marseille"],
      horario: "2025-07-22T19:45:00Z",
      odds: [1.80, 3.40, 4.00]
    }
  ];

  jogosContainer.innerHTML = "";

  jogos.forEach(jogo => {
    const hora = new Date(jogo.horario).toLocaleString("pt-BR");

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
