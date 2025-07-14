document.addEventListener('DOMContentLoaded', async () => {
  const jogosContainer = document.getElementById('jogos');

  try {
    const response = await fetch('https://nipobet-api.vercel.app/api/odds');
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      jogosContainer.innerHTML = '<p>Nenhum jogo disponível no momento.</p>';
      return;
    }

    data.forEach(jogo => {
      const jogoDiv = document.createElement('div');
      jogoDiv.classList.add('jogo');

      jogoDiv.innerHTML = `
        <h3>${jogo.sport_nice} - ${jogo.teams.join(' vs ')}</h3>
        <p>Começa: ${new Date(jogo.commence_time).toLocaleString('pt-BR')}</p>
        <div class="odds">
          ${jogo.sites.slice(0, 1).map(site => `
            <p><strong>${site.site_nice}</strong></p>
            <button onclick="apostar('${jogo.teams[0]}', ${site.odds.h2h[0]}, '${jogo.id}')">${jogo.teams[0]} - ${site.odds.h2h[0]}</button>
            <button onclick="apostar('Empate', ${site.odds.h2h[2] || 0}, '${jogo.id}')">Empate - ${site.odds.h2h[2] || 'N/A'}</button>
            <button onclick="apostar('${jogo.teams[1]}', ${site.odds.h2h[1]}, '${jogo.id}')">${jogo.teams[1]} - ${site.odds.h2h[1]}</button>
          `).join('')}
        </div>
      `;

      jogosContainer.appendChild(jogoDiv);
    });

  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    jogosContainer.innerHTML = '<p>Erro ao carregar jogos.</p>';
  }
});

function apostar(time, odd, jogoId) {
  const valor = prompt(`Quanto deseja apostar em ${time}?`);
  if (!valor || isNaN(valor) || Number(valor) <= 0) {
    alert('Valor inválido.');
    return;
  }

  alert(`Aposta de ${valor} Nips em ${time} com odd ${odd} registrada! (Simulado)`);
}
