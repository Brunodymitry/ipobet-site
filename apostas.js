document.addEventListener('DOMContentLoaded', async () => {
  const user = localStorage.getItem('username');
  const saldo = localStorage.getItem('saldo');
  document.getElementById('username').textContent = user;
  document.getElementById('saldo').textContent = saldo;

  const container = document.getElementById('jogos');
  try {
    const res = await fetch('https://nipobet-api.vercel.app/api/odds');
    const data = await res.json();

    if (!Array.isArray(data)) throw new Error('Formato inválido');

    data.forEach(jogo => {
      const div = document.createElement('div');
      div.classList.add('jogo');
      div.innerHTML = `
        <h4>${jogo.teams.join(" vs ")}</h4>
        <p>${new Date(jogo.commence_time).toLocaleString()}</p>
        <div class="botoes">
          <button onclick="apostar('${jogo.teams[0]}', ${jogo.sites[0].odds.h2h[0]})">${jogo.teams[0]} - ${jogo.sites[0].odds.h2h[0]}</button>
          <button onclick="apostar('Empate', ${jogo.sites[0].odds.h2h[2] || 0})">Empate - ${jogo.sites[0].odds.h2h[2] || 'N/A'}</button>
          <button onclick="apostar('${jogo.teams[1]}', ${jogo.sites[0].odds.h2h[1]})">${jogo.teams[1]} - ${jogo.sites[0].odds.h2h[1]}</button>
        </div>`;
      container.appendChild(div);
    });
  } catch (e) {
    container.innerHTML = '<p>Erro ao carregar jogos.</p>';
  }
});

function apostar(time, odd) {
  const valor = prompt(`Quanto deseja apostar em ${time}?`);
  if (!valor || isNaN(valor)) return alert("Valor inválido");

  const saldo = parseFloat(localStorage.getItem('saldo'));
  const aposta = parseFloat(valor);
  if (aposta > saldo) return alert("Saldo insuficiente");

  const novoSaldo = saldo - aposta;
  localStorage.setItem('saldo', novoSaldo.toFixed(2));
  document.getElementById('saldo').textContent = novoSaldo.toFixed(2);

  alert(`Aposta de ${aposta} Nips em ${time} com odd ${odd} registrada!`);
}
