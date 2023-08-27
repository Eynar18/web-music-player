let imgArtista = document.querySelector(".img-artista");
let nomMusica = document.querySelector(".nom-musica");
let nomArtista = document.querySelector(".nom-artista");

let btnPausarContinuar = document.querySelector(".pausar-continuar");
let btnPular = document.querySelector(".pular");
let btnVoltar = document.querySelector(".voltar");

let sliderProcura = document.querySelector(".procura_slider");
let sliderVolume = document.querySelector(".volume_slider");
let tempoAtual = document.querySelector(".tempo-atual");
let duracao = document.querySelector(".duracao");

let musicaIndex = 0;
let isTocando = false;
let delayAtualizaTimer;

let musicaAtual = document.createElement("audio");

let listaMusicas = [
  {
    nome: "A Picture in Motion",
    artista: "Waveshaper",
    imagem: "./images/waveshaper.png",
    caminho: "./songs/a_picture_in_motion.mp3",
  },
  {
    nome: "Hang'em All",
    artista: "Carpenter Brut",
    imagem: "./images/carpenter_brut.png",
    caminho: "./songs/hang_em_all.mp3",
  },
  {
    nome: "Make This Right",
    artista: "Toxic Avenger",
    imagem: "./images/toxic_avenger.png",
    caminho: "./songs/make_this_right.mp3",
  },
  {
    nome: "Roller Mobster",
    artista: "Carpenter Brut",
    imagem: "./images/carpenter_brut.png",
    caminho: "./songs/roller_mobster.mp3",
  },
  {
    nome: "What We Fight For",
    artista: "Carpenter Brut",
    imagem: "./images/carpenter_brut.png",
    caminho: "./songs/what_we_fight_for.mp3",
  },
  {
    nome: "You're Mine",
    artista: "Carpenter Brut",
    imagem: "./images/carpenter_brut.png",
    caminho: "./songs/youre_mine.mp3",
  },
];

carregaMusica(musicaIndex);

function carregaMusica(musicaIndex) {
  clearInterval(delayAtualizaTimer);
  resetarValores();

  musicaAtual.src = listaMusicas[musicaIndex].caminho;
  musicaAtual.load();

  imgArtista.style.backgroundImage =
    "url(" + listaMusicas[musicaIndex].imagem + ")";
  nomMusica.textContent = listaMusicas[musicaIndex].nome;
  nomArtista.textContent = listaMusicas[musicaIndex].artista;

  delayAtualizaTimer = setInterval(atualizaSliderProcura, 1000);

  musicaAtual.addEventListener("ended", proxMusica);

  setCorFundoRandom();
}

function setCorFundoRandom() {
  let vermelho = Math.floor(Math.random() * 256) + 64;
  let verde = Math.floor(Math.random() * 256) + 64;
  let azul = Math.floor(Math.random() * 256) + 64;

  let corFundo = "rgb(" + vermelho + ", " + verde + ", " + azul + ")";

  document.body.style.background = corFundo;
}

function resetarValores() {
  tempoAtual.textContent = "00:00";
  duracao.textContent = "00:00";
  sliderProcura.value = 0;
}

function pausarContinuar() {
  if (!isTocando) continuar();
  else pausar();
}

function continuar() {
  musicaAtual.play();
  isTocando = true;

  btnPausarContinuar.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pausar() {
  musicaAtual.pause();
  isTocando = false;

  btnPausarContinuar.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function proxMusica() {
  if (musicaIndex < listaMusicas.length - 1) musicaIndex += 1;
  else musicaIndex = 0;

  carregaMusica(musicaIndex);
  continuar();
}

function musicaAnterior() {
  if (musicaIndex > 0) musicaIndex -= 1;
  else musicaIndex = listaMusicas.length - 1;

  carregaMusica(musicaIndex);
  continuar();
}

function irPara() {
  timeStamp = musicaAtual.duration * (sliderProcura.value / 100);

  musicaAtual.currentTime = timeStamp;
}

function setVolume() {
  musicaAtual.volume = sliderVolume.value / 100;
}

function atualizaSliderProcura() {
  let timeStamp = 0;

  if (!isNaN(musicaAtual.duration)) {
    timeStamp = musicaAtual.currentTime * (100 / musicaAtual.duration);
    sliderProcura.value = timeStamp;

    let minutosAtuais = Math.floor(musicaAtual.currentTime / 60);
    let segundosAtuais = Math.floor(
        musicaAtual.currentTime - minutosAtuais * 60
    );
    let minutosDuracao = Math.floor(musicaAtual.duration / 60);
    let segundosDuracao = Math.floor(
        musicaAtual.duration - minutosDuracao * 60
    );

    if (segundosAtuais < 10) {
        segundosAtuais = "0" + segundosAtuais;
    }
    if (segundosDuracao < 10) {
        segundosDuracao = "0" + segundosDuracao;
    }
    if (minutosAtuais < 10) {
        minutosAtuais = "0" + minutosAtuais;
    }
    if (minutosDuracao < 10) {
        minutosDuracao = "0" + minutosDuracao;
    }

    tempoAtual.textContent = minutosAtuais + ":" + segundosAtuais;
    duracao.textContent = minutosDuracao + ":" + segundosDuracao;
  }
}
