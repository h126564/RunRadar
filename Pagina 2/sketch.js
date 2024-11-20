let icons = [];
let temperature = 6;
let windgraden = 230;
let windsnelheid = 21;
let windrichting;

function setup() {
  createCanvas(1900, 972);
  background("#222831");
  updateData();
}

function preload() {
  windrichting = loadImage("direction.png");
}

function mousePressed() {
  fullscreen(true);
}

function draw() {
  zoekscherm();
  kaart();
  weeroproute();
}

function zoekscherm() {
  fill("#393E46");
  rect(50, 50, 1000, 400, 50);

  fill("white");
  textSize(60);
  text("Startlocatie", 150, 150);
  text("Eindlocatie", 650, 150);
}

function kaart() {
  fill("#393E46");
  rect(1150, 50, 700, 400, 50);
}

function weeroproute() {
  fill("#393E46");
  rect(50, 500, 1800, 400, 50);

  fill("white");
  textSize(60);
  text("Weer op deze route", 116, 580);
  textAlign(CENTER);

  let currentTime = roundedTime();
  fill("#222831");

  for (let i = 0; i < 13; i++) {
    let x = 116 + i * 130;
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

    rect(x, 610, 100, 250, 10);
    fill("white");
    textSize(30);
    text(formattedTime, x + 48, 650);
    text(`${temperature}°C`, x + 48, 735);
    textSize(25);
    text(`${windsnelheid} km/h`, x + 48, 840);
    image(icons[i], x + 5, 635, 90, 90);

    push();
    angleMode(DEGREES);
    translate(x + 50, 775);
    rotate(windgraden);
    imageMode(CENTER);
    image(windrichting, 0, 0, 50, 50);
    pop();

    currentTime.setMinutes(currentTime.getMinutes() + 15);
    fill("#222831");
  }

  textAlign(LEFT);
}

function updateData() {
  const weatherIconCode = "04n";
  for (let i = 0; i < 13; i++) {
    icons[i] = loadImage(
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
