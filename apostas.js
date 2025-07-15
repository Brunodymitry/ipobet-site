document.addEventListener('DOMContentLoaded', async () => {
  const username = localStorage.getItem('username') || "Convidado";
  let saldo = parseFloat(localStorage.getItem('saldo')) || 1000;
  document.getElementById('username').textContent = username;
  document.getElementById('saldo').textContent = saldo.toFixed(2);

  const jogosContainer = document.getElementById('jogos');
  jogosContainer.innerHTML = "<p>Carregando jogos...</p>";

  try {
    const response = await fetch('https://nipobet-api.vercel.app/api/odds');
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const jogos = await response.json();
    console.log("✅ Dados recebidos da API:", jogos);

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
        <div class="botoes">
          <button onclick="apostar('${equipes[0]}', ${odds[0]})">${equipes[0]} - ${odds[0]}</button>
          <button onclick="apostar('Empate', ${odds[2] || 0})">Empate - ${odds[2] || "N/A"}</button>
          <button onclick="apostar('${equipes[1]}', ${odds[1]})">${equipes[1]} - ${odds[1]}</button>
        </div>
      `;
      jogosContainer.appendChild(card);
    });

  } catch (e) {
    console.error("❌ Erro ao carregar jogos:", e);
    jogosContainer.innerHTML = `<p style="color: red;">Erro: ${e.message}</p>`;
  }
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
