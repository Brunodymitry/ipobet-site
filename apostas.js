
document.addEventListener('DOMContentLoaded', async () => {
  const jogosContainer = document.getElementById('jogos');
  jogosContainer.innerHTML = "<p>Carregando jogos...</p>";

  try {
    const response = await fetch('https://nipobet-api.vercel.app/api/odds');
    const jogos = await response.json();

    if (!Array.isArray(jogos) || jogos.length === 0) {
      throw new Error("Nenhum jogo encontrado.");
    }

    jogosContainer.innerHTML = "";
    jogos.forEach(jogo => {
      const equipes = jogo.teams;
      const odds = jogo.sites?.[0]?.odds?.h2h;
      const hora = new Date(jogo.commence_time).toLocaleString();

      if (!equipes || !odds) return;

      const card = document.createElement('div');
      card.className = 'jogo';
      card.innerHTML = `
        <h3>${equipes[0]} vs ${equipes[1]}</h3>
        <p><strong>Data:</strong> ${hora}</p>
        <button onclick="apostar('${equipes[0]}', ${odds[0]})">${equipes[0]} - ${odds[0]}</button>
        <button onclick="apostar('Empate', ${odds[2] || 0})">Empate - ${odds[2] || "N/A"}</button>
        <button onclick="apostar('${equipes[1]}', ${odds[1]})">${equipes[1]} - ${odds[1]}</button>
      `;
      jogosContainer.appendChild(card);
    });
  } catch (e) {
    jogosContainer.innerHTML = `<p style="color:red;">Erro ao carregar jogos: ${e.message}</p>`;
  }
});

function apostar(time, odd) {
  const valor = parseFloat(prompt(`Quanto deseja apostar em ${time}?`));
  if (isNaN(valor) || valor <= 0) {
    alert("Valor inválido.");
    return;
  }
  alert(`Aposta feita em ${time} com odd ${odd} e valor ${valor} Nips.`);
}
