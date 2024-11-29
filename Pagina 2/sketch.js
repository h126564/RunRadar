let icons = [];
let temperature = 6;
let windgraden = 230;
let windsnelheid = 21;
let windrichting;

p.setup = function() {
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
  weeroproute();
}

function zoekscherm() {
  P.fill("#393E46");
  P.rect(50, 50, 1000, 400, 50);

  P.fill("white");
  P.textSize(60);
  P.text("Startlocatie", 150, 150);
  P.text("Eindlocatie", 650, 150);
}

function kaart() {
  P.fill("#393E46");
  P.rect(1150, 50, 700, 400, 50);
}

function weeroproute() {
  P.fill("#393E46");
  P.rect(50, 500, 1800, 400, 50);

  P.fill("white");
  P.textSize(60);
  P.text("Weer op deze route", 116, 580);
  P.textAlign(P.CENTER);

  let currentTime = roundedTime();
  P.fill("#222831");

  for (let i = 0; i < 13; i++) {
    let x = 116 + i * 130;
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

    P.rect(x, 610, 100, 250, 10);
    P.fill("white");
    P.textSize(30);
    P.text(formattedTime, x + 48, 650);
    P.text(`${temperature}°C`, x + 48, 735);
    P.textSize(25);
    P.text(`${windsnelheid} km/h`, x + 48, 840);
    P.image(icons[i], x + 5, 635, 90, 90);

    P.push();
    P.angleMode(P.DEGREES);
    P.translate(x + 50, 775);
    P.rotate(windgraden);
    P.imageMode(P.CENTER);
    P.image(windrichting, 0, 0, 50, 50);
    P.pop();

    currentTime.setMinutes(currentTime.getMinutes() + 15);
    P.fill("#222831");
  }

  P.textAlign(P.LEFT);
}

function updateData() {
  const weatherIconCode = "04n";
  for (let i = 0; i < 13; i++) {
    icons[i] = P.loadImage(
      `https://rodrigokamada.github.io/openweathermap/images/${weatherIconCode}_t.png`
    );
  }
  windgraden = 340;
}

function roundedTime() {
  let now = new Date();
  let minutes = now.getMinutes();
  let roundedMinutes = Math.floor(minutes / 15) * 15;
  now.setMinutes(roundedMinutes, 0, 0);
  return now;
}
