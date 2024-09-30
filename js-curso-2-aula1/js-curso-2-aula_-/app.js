//Inserção de texto do HTML dentro do JavaScript, essa também é uma forma ruim de se fazer quando há muitas funções

//let titulo = document.querySelector("h1");
//titulo.innerHTML = "Jogo do número secreto";

//let paragrafo = document.querySelector("p");
//paragrafo.innerHTML = "Escolha um número entre 1 e 10";

//essa propriedade faz a mesma coisa que a anterior identificando as tags e os textos em uma função só
let listaDeNumerosSorteados = []
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial(){
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

exibirMensagemInicial();

//Para criar uma função sempre usar o nome "function" e sempre precisará ter um nome próprio. "Nomenclatura é importante"
// Função tem normalmente uma responsabilidade, nada mais.

function verificarChute(){
    let chute = document.querySelector("input").value;
    if(chute == numeroSecreto){
      exibirTextoNaTela("h1", "Acertou!!");
      let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
      let mensagensTentativas =`Você descobriu o número secreto em ${tentativas} ${palavraTentativa}`;
      exibirTextoNaTela("p", mensagensTentativas);
      document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
      if (chute > numeroSecreto) {
        exibirTextoNaTela("p", "O número secreto é menor");
      } else {
        exibirTextoNaTela("p", "O número secreto é maior");
      }
      tentativas++;
      limparCampo();
    }
}

function gerarNumeroAleatorio(){
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

  if(quantidadeDeElementosNaLista == numeroLimite){
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  }  else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo(){
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo(){
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}

