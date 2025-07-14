// Detectar qual página estamos
const pagina = window.location.pathname.split("/").pop();

if (pagina === "index.html") {
  const playBtn = document.getElementById("playBtn");
  playBtn.addEventListener("click", () => {
    sessionStorage.setItem("jogoIniciado", "sim");
    sessionStorage.removeItem("respostasFamiliator");
    window.location.href = "perguntas.html";
  });
}

if (pagina === "perguntas.html") {
  if (sessionStorage.getItem("jogoIniciado") !== "sim") {
    window.location.href = "index.html";
  }

  const perguntaEl = document.getElementById("pergunta");
  const btnSim = document.getElementById("btnSim");
  const btnNao = document.getElementById("btnNao");

  let etapa = 0;
  let respostas = {};

  function mostrarPergunta(texto) {
    perguntaEl.textContent = texto;
  }

  function irParaResposta(texto) {
    sessionStorage.setItem("resultadoFamiliator", texto);
    window.location.href = "resposta.html";
  }

  function proximaPergunta(resposta) {
    switch (etapa) {
      case 0:
        respostas.homem = resposta;
        if (resposta) {
          etapa = 1;
          mostrarPergunta("É mais velho que você?");
        } else {
          etapa = 4;
          mostrarPergunta("É mais velha que você?");
        }
        break;

      case 1:
        respostas.maisVelho = resposta;
        if (resposta) {
          etapa = 2;
          mostrarPergunta("É irmão do seu tio?");
        } else {
          etapa = 3;
          mostrarPergunta("É filho do seu tio?");
        }
        break;

      case 2:
        respostas.irmaoDoTio = resposta;
        if (resposta) {
          irParaResposta("Seu personagem é seu pai!");
        } else {
          irParaResposta("Seu personagem é seu tio!");
        }
        break;

      case 3:
        respostas.filhoDoTio = resposta;
        if (resposta) {
          irParaResposta("Seu personagem é seu primo!");
        } else {
          irParaResposta("Seu personagem é seu irmão!");
        }
        break;

      case 4:
        respostas.maisVelho = resposta;
        if (resposta) {
          etapa = 5;
          mostrarPergunta("É irmã da sua tia?");
        } else {
          etapa = 6;
          mostrarPergunta("É filha do seu tio?");
        }
        break;

      case 5:
        respostas.irmaDaTia = resposta;
        if (resposta) {
          irParaResposta("Seu personagem é sua mãe!");
        } else {
          irParaResposta("Seu personagem é sua tia!");
        }
        break;

      case 6:
        respostas.filhaDoTio = resposta;
        if (resposta) {
          irParaResposta("Seu personagem é sua prima!");
        } else {
          irParaResposta("Seu personagem é sua irmã!");
        }
        break;

      default:
        irParaResposta("Erro inesperado.");
    }
  }

  mostrarPergunta("Seu personagem é homem?");

  btnSim.addEventListener("click", () => proximaPergunta(true));
  btnNao.addEventListener("click", () => proximaPergunta(false));
}

if (pagina === "resposta.html") {
  if (sessionStorage.getItem("jogoIniciado") !== "sim") {
    window.location.href = "index.html";
  }

  const resultadoEl = document.getElementById("resultado");
  const jogarNovamenteBtn = document.getElementById("jogarNovamente");

  const resultado = sessionStorage.getItem("resultadoFamiliator");
  if (resultado) {
    resultadoEl.textContent = resultado;
  } else {
    resultadoEl.textContent = "Nenhum resultado encontrado.";
  }

  jogarNovamenteBtn.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
  });
}
