
const API_KEY = 'a686083eb33fbf897c72bd47c1ddec9b';
const saldoEl = document.getElementById('saldo');
let saldo = parseFloat(localStorage.getItem('nipobet_saldo')) || 1000;
if (saldoEl) saldoEl.textContent = saldo.toFixed(2);

const campeonato = localStorage.getItem('campeonatoSelecionado') || 'soccer_epl';
const lista = document.getElementById('lista-jogos');
const url = `https://api.the-odds-api.com/v4/sports/${campeonato}/odds/?regions=eu&markets=h2h&apiKey=${API_KEY}`;

fetch(url)
  .then(r => r.json())
  .then(data => {
    if (!lista) return;
    lista.innerHTML = '';
    data.slice(0, 5).forEach(jogo => {
      const casa = jogo.home_team;
      const fora = jogo.away_team;
      const odds = jogo.bookmakers[0]?.markets[0]?.outcomes;

      const div = document.createElement('div');
      div.className = 'jogo';
      div.innerHTML = `
        <h3>${casa} vs ${fora}</h3>
        ${odds.map(o => `
          <button onclick="apostar('${o.name}', ${o.price})">
            ${o.name} - Odd: ${o.price}
          </button>
        `).join('<br>')}
        <br>
        Valor: <input type="number" id="valor-${jogo.id}" placeholder="Ex: 50">
      `;
      lista.appendChild(div);
    });
  });

function apostar(time, odd) {
  const valorInput = event.target.parentElement.querySelector('input');
  const valor = parseFloat(valorInput.value);
  if (isNaN(valor) || valor <= 0) {
    alert("Informe um valor válido.");
    return;
  }
  if (valor > saldo) {
    alert("Saldo insuficiente!");
    return;
  }

  const ganho = valor * odd;
  saldo -= valor;
  saldo += ganho; // simulação: sempre ganha
  localStorage.setItem('nipobet_saldo', saldo.toFixed(2));
  alert(`Você apostou ${valor} Nips em ${time} (Odd ${odd}).
Ganhou: ${ganho.toFixed(2)} Nips.`);
  if (saldoEl) saldoEl.textContent = saldo.toFixed(2);
}
