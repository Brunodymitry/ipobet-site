document.addEventListener('DOMContentLoaded', async () => {
  const user = localStorage.getItem('username') || 'Convidado';
  const saldo = localStorage.getItem('saldo') || 1000;

  document.getElementById('username').textContent = user;
  document.getElementById('saldo').textContent = saldo;

  const container = document.getElementById('jogos');
  container.innerHTML = '<p>🔄 Carregando jogos...</p>';

  try {
    const res = await fetch('https://nipobet-api.vercel.app/api/odds');
    if (!res.ok) throw new Error('Erro na resposta da API');

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Nenhum jogo encontrado');
    }

    container.innerHTML = '';
    data.forEach(jogo => {
      const div = document.createElement('div');
      const equipes = jogo.teams;
      const odds = jogo.sites?.[0]?.odds?.h2h;

      if (!equipes || !odds) return;

      div.classList.add('jogo');
      div.innerHTML = `
        <h4>${equipes[0]} vs ${equipes[1]}</h4>
        <p>${new Date(jogo.commence_time).toLocaleString()}</p>
        <div class="botoes">
          <button onclick="apostar('${equipes[0]}', ${odds[0]})">${equipes[0]} - ${odds[0]}</button>
          <button onclick="apostar('Empate', ${odds[2] || 0})">Empate - ${odds[2] || 'N/A'}</button>
          <button onclick="apostar('${equipes[1]}', ${odds[1]})">${equipes[1]} - ${odds[1]}</button>
        </div>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error('Erro ao carregar jogos:', err);
    container.innerHTML = '<p>❌ Erro ao carregar jogos. Tente novamente mais tarde.</p>';
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
