
const API_KEY = 'a686083eb33fbf897c72bd47c1ddec9b';
const BASE_URL = 'https://api.the-odds-api.com/v4/sports/soccer_epl/odds/';

async function carregarOdds() {
  const url = `${BASE_URL}?regions=eu&markets=h2h&apiKey=${API_KEY}`;
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error('Erro ao buscar dados da API.');
    const dados = await resposta.json();
    const lista = document.getElementById('lista-jogos');
    lista.innerHTML = '';

    dados.slice(0, 5).forEach(jogo => {
      const casa = jogo.home_team;
      const visitante = jogo.away_team;
      const odds = jogo.bookmakers[0]?.markets[0]?.outcomes;

      const div = document.createElement('div');
      div.className = 'jogo';
      div.innerHTML = `
        <strong>${casa} vs ${visitante}</strong><br>
        Odds:<br>
        ${odds.map(o => `${o.name}: ${o.price}`).join('<br>')}
      `;
      lista.appendChild(div);
    });
  } catch (e) {
    document.getElementById('lista-jogos').innerText = 'Erro ao carregar odds.';
    console.error(e);
  }
}

carregarOdds();
