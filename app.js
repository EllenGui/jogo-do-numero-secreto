let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//funçaõ com parametro
function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,"Brazilian Portuguese Female",{rate:1.2});
}

//função sem parametro:
function exibirMensagemInicial(){
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}
exibirMensagemInicial();//precisamos chamar para que ela seja executada na primeira vez que o app.js for lido.

//função sem parametro:
function verificarChute() {
    let chute = document.querySelector("input").value;//value para pegar apenas o valor que esta no input
    if (chute == numeroSecreto){
        exibirTextoNaTela("h1","Acertou, parabéns!");
        let palavraTentativas = tentativas > 1 ? "tentativas":"tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}.`
        exibirTextoNaTela("p",mensagemTentativas);
        //manipulando o html: estamos removendo o atributo disabled que tem o id reiniciar, para que o botao de novo jogo funcione
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else {
        if(chute > numeroSecreto){
            exibirTextoNaTela("p","O número secreto é menor");
        }else{
            exibirTextoNaTela("p","O número secreto é maior");
        }
        tentativas++;
        limparCampo();
    }
}
//funçaõ com retorno
function gerarNumeroAleatorio() {
    //usa o return para que o valor gerado seja retornado/enviado para a variavel criada na linha 1
    let numeroEscolhido = parseInt(Math.random() * numeroLimite +1);//para geram um numero aleatorio entre 1 e 10
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite ){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){//estamos fazendo uma verificação p/ saber se na lista esta incluida(.includes) o numero sorteado
        return gerarNumeroAleatorio();//caso o n sorteado ja tenha sido sorteado ele vai retornar para a função gerar n aleatorio
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
//função que caso o usuario erre o numero, limpa o input
function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
    
}
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}