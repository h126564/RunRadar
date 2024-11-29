function pagina2(p){
let icons;
let temperature = 6;
let windsnelheid = 21;

P.setup = function() {
  P.createCanvas(1900, 972);
  P.background("#222831");
  updateData();
}

P.preload = function() {
  windrichting = P.loadImage("direction.png");
}

P.mousePressed = function() {
  P.fullscreen(true);
}

P.draw = function() {
  zoekscherm();
  kaart();
  bestetijd();
}

function zoekscherm() {
  P.fill("#393E46");
  P.rect(50, 50, 850, 400, 50);
  P.fill('white');
  P.textSize(50);
  P.text("wat is het beste weer tussen:", 70, 100);
}

function kaart() {
  P.fill("#393E46");
  P.rect(1000, 50, 850, 850, 50);
}

function bestetijd() {
  P.fill("#393E46");
  P.rect(50, 500, 850, 400, 50);
  P.fill("#222831")
  P.rect(400, 550, 450, 300, 20);
  P.image(icons, 420, 550, 150, 150);
  P.textAlign(P.CENTER);
  P.fill('white');
  P.text(`${temperature}°C`, 510, 750);
  P.text(`${windsnelheid} km/h`, 730, 750);

  P.push();
  P.angleMode(P.DEGREES);
  P.translate(720, 630);
  P.rotate(windgraden);
  P.imageMode(P.CENTER);
  P.image(windrichting, 0, 0, 100, 100);
  P.pop();

  P.textAlign(P.LEFT);
}

function updateData() {
  const weatherIconCode = "04n";
  icons = P.loadImage(
    `https://rodrigokamada.github.io/openweathermap/images/${weatherIconCode}_t.png`
  );
  windgraden = 30;
}
}
new p5(pagina2)