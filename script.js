
let saldo = 1000;
let apostaSelecionada = null;

const jogos = [
  { times: "Flamengo x Palmeiras", odds: [1.90, 3.20, 4.10] },
  { times: "Real Madrid x Barcelona", odds: [2.00, 3.00, 3.50] },
  { times: "PSG x Lyon", odds: [1.75, 3.40, 4.80] }
];

const jogosContainer = document.getElementById("jogos-container");

jogos.forEach((jogo, index) => {
  const jogoDiv = document.createElement("div");
  jogoDiv.className = "jogo";
  jogoDiv.innerHTML = `
    <div class="times">${jogo.times}</div>
    <div class="odds">
      ${jogo.odds.map((odd, i) => `<div class="odd" onclick="selecionarAposta(${index}, ${i})">${odd}</div>`).join('')}
    </div>
  `;
  jogosContainer.appendChild(jogoDiv);
});

function selecionarAposta(jogoIndex, oddIndex) {
  apostaSelecionada = {
    jogo: jogos[jogoIndex].times,
    odd: jogos[jogoIndex].odds[oddIndex]
  };
  document.getElementById("jogo-selecionado").innerText =
    `Você selecionou: ${apostaSelecionada.jogo} | Odd: ${apostaSelecionada.odd}`;
  document.getElementById("aposta-box").style.display = "block";
  document.getElementById("mensagem").innerText = "";
}

function confirmarAposta() {
  const valor = parseFloat(document.getElementById("valor-aposta").value);
  if (isNaN(valor) || valor <= 0) {
    alert("Digite um valor válido.");
    return;
  }
  if (valor > saldo) {
    alert("Saldo insuficiente.");
    return;
  }

  saldo -= valor;
  document.getElementById("saldo").innerText = `Saldo: ${saldo.toFixed(2)} Nips`;
  document.getElementById("mensagem").innerText = `Aposta de ${valor} Nips feita em ${apostaSelecionada.jogo} (Odd: ${apostaSelecionada.odd})`;
  document.getElementById("valor-aposta").value = "";
  document.getElementById("aposta-box").style.display = "none";
}
