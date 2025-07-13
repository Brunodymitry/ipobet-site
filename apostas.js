document.addEventListener("DOMContentLoaded", () => {
  const jogosContainer = document.getElementById("jogos");

  fetch("https://nipobet-api.vercel.app/api/odds")
    .then(res => res.json())
    .then(data => {
      jogosContainer.innerHTML = ""; // Limpa antes de adicionar

      if (!data || !data.data || data.data.length === 0) {
        jogosContainer.innerHTML = "<p>Nenhum jogo disponível no momento.</p>";
        return;
      }

      data.data.forEach(jogo => {
        const evento = jogo.teams ? `${jogo.teams[0]} vs ${jogo.teams[1]}` : "Jogo não identificado";
        const oddCasa = jogo.sites[0]?.odds?.h2h?.[0] || "-";
        const oddEmpate = jogo.sites[0]?.odds?.h2h?.[2] || "-";
        const oddFora = jogo.sites[0]?.odds?.h2h?.[1] || "-";
        const dataJogo = new Date(jogo.commence_time).toLocaleString("pt-BR");

        const card = document.createElement("div");
        card.classList.add("jogo");
        card.innerHTML = `
          <h3>${evento}</h3>
          <p><strong>Data:</strong> ${dataJogo}</p>
          <p>
            <button onclick="apostar('${evento}', '${jogo.teams[0]}', ${oddCasa})">
              ${jogo.teams[0]} (${oddCasa})
            </button>
            <button onclick="apostar('${evento}', 'Empate', ${oddEmpate})">
              Empate (${oddEmpate})
            </button>
            <button onclick="apostar('${evento}', '${jogo.teams[1]}', ${oddFora})">
              ${jogo.teams[1]} (${oddFora})
            </button>
          </p>
        `;
        jogosContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar jogos:", err);
      jogosContainer.innerHTML = "<p>Erro ao carregar os jogos.</p>";
    });
});

function apostar(jogo, time, odd) {
  const valor = prompt(`Você quer apostar quantos Nips em ${time}?`);
  const valorNum = parseFloat(valor);

  if (isNaN(valorNum) || valorNum <= 0) {
    alert("Valor inválido.");
    return;
  }

  alert(`Aposta feita: ${valorNum} Nips em ${time} no jogo ${jogo} (odd ${odd})`);
  // Aqui você pode salvar no localStorage ou no backend
}
