//variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 20;
let raio = dBolinha / 2; 

//velocidade da Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da Raquete 1
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 80

//variáveis da Raquete 2
let xRaqueteBot = 585;
let yRaqueteBot = 150;
let velocidadeXBot;
let velocidadeYBot;
let chanceErro = 0

//placar
let meusPontos = 0;
let pontosBot = 0;

let colidiu = false;

//sons
let erro;
let ponto;
let trilha;

function preload(){
  trilha = loadSound ("background.wav");
  ponto = loadSound ("acerto.wav");
  erro = loadSound ("erro.wav");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background('rgb(192, 183, 243)');
  mostraBolinha();
  movimentaBolinha();
  colisaoBolinha();
  mostraRaquete(xRaquete ,yRaquete);
  mostraRaquete(xRaqueteBot, yRaqueteBot);
  movimentaRaquete();
  movimentaRaqueteBot();
  colisaoRaquete();
  colisaoRaqueteBiblio(xRaquete ,yRaquete);
  colisaoRaqueteBiblio(xRaqueteBot, yRaqueteBot);
  incluiplacar();
  marcaPonto();
  bolinhaReset();
 }

function mostraBolinha() {
  stroke('rgb(246, 105, 255)');
  fill('#fae'); 
  circle(xBolinha, yBolinha, dBolinha);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBolinha(){
  
  if (xBolinha + raio > width || xBolinha - raio < 0){ 
  velocidadeXBolinha *= -1; erro.play();
    
}
  
if (yBolinha + raio > height || yBolinha - raio < 0){
  velocidadeYBolinha *= -1;
  
}
  
}

function mostraRaquete(x, y){
  stroke('rgb(83, 214, 130)');
  fill('rgb(138, 225, 115)');
  rect(x, y, raqueteComprimento, raqueteAltura );
  
}

function movimentaRaquete(){
  if (keyIsDown (87)){ 
  yRaquete -= 10;
  }
  if (keyIsDown (83)){ 
  yRaquete += 10;
  
  }
 
}

function movimentaRaqueteBot(){
  velocidadeYBot = yBolinha - yRaqueteBot - raqueteComprimento / 2 - 30;
  yRaqueteBot += velocidadeYBot + chanceErro;
  calculaChanceErro();
}

function calculaChanceErro(){
  if (pontosBot >= meusPontos){
    chanceErro +=1;
  
  if (chanceErro >= 39){
    chanceErro = 40
  }
} else {
  chanceErro -= 1
  if (chanceErro <=35){
    chanceErro =35}
  }
}

function colisaoRaquete(){
  
  if (xBolinha - raio < xRaquete + raqueteComprimento 
  && yBolinha - raio < yRaquete + raqueteAltura
  && yBolinha + raio > yRaquete )
  velocidadeXBolinha *= -1;

  
}

function colisaoRaqueteBiblio(x,y){
  colidiu = 
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){ 
  velocidadeXBolinha *= -1;
    ponto.play();
}
}

function incluiplacar(){
  stroke('rgb(240, 229, 70)');
  fill('rgb(251, 225, 115)');
  textSize(20);
  text(meusPontos, 270, 26);
  text(pontosBot, 321, 26);
  
}
 
function marcaPonto(){
  if (xBolinha >590){
    meusPontos +=1;
  }
  if (xBolinha<10){
    pontosBot +=1;
  }
}

function bolinhaReset(){
  if (xBolinha - raio < 0){
    xBolinha = 23
  }
}
