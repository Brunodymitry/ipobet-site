document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("nipobet_user");
  const saldo = parseFloat(localStorage.getItem("nipobet_balance") || 1000);
  document.getElementById("username").textContent = user;
  document.getElementById("saldo").textContent = saldo.toFixed(2);

  const form = document.getElementById("apostas-form");

  fetch("https://nipobet-api.vercel.app/api/odds")
    .then(res => res.json())
    .then(data => {
      data.forEach((jogo, index) => {
        form.innerHTML += `
          <div class="game">
            <p><strong>${jogo.teams[0]} x ${jogo.teams[1]}</strong><br>
            <small>${new Date(jogo.commence_time).toLocaleString("pt-BR")}</small></p>
            <label><input type="radio" name="jogo${index}" value="${jogo.bookmakers[0].markets[0].outcomes[0].price}"> ${jogo.teams[0]} (Odd: ${jogo.bookmakers[0].markets[0].outcomes[0].price})</label>
            <label><input type="radio" name="jogo${index}" value="${jogo.bookmakers[0].markets[0].outcomes[1].price}"> ${jogo.teams[1]} (Odd: ${jogo.bookmakers[0].markets[0].outcomes[1].price})</label><br>
            Valor: <input type="number" id="valor${index}" min="0" value="0">
          </div>
        `;
      });
    })
    .catch(error => {
      form.innerHTML = "<p>Erro ao carregar jogos. Tente novamente mais tarde.</p>";
      console.error("Erro ao buscar jogos:", error);
    });
});

function fazerApostas() {
  let saldo = parseFloat(localStorage.getItem("nipobet_balance") || 1000);
  const apostas = document.querySelectorAll(".game");
  let totalAposta = 0;
  let ganhosPotenciais = 0;

  apostas.forEach((jogo, i) => {
    const valor = parseFloat(document.getElementById("valor" + i).value || 0);
    const opcao = document.querySelector("input[name='jogo" + i + "']:checked");
    if (valor > 0 && opcao) {
      totalAposta += valor;
      ganhosPotenciais += valor * parseFloat(opcao.value);
    }
  });

  if (totalAposta === 0) {
    alert("Escolha ao menos uma aposta.");
    return;
  }

  if (totalAposta > saldo) {
    alert("Saldo insuficiente.");
    return;
  }

  saldo -= totalAposta;
  localStorage.setItem("nipobet_balance", saldo.toFixed(2));
  alert(`Apostas feitas com sucesso!\nTotal apostado: ${totalAposta} Nips\nPossível retorno: ${ganhosPotenciais.toFixed(2)} Nips`);
  location.reload();
}
