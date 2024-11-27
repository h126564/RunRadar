let icons
let temperature = 6
let windsnelheid = 21;

function setup() {
  createCanvas(1900, 972);
  background("#222831");
  updateData()
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
  bestetijd();
}

function zoekscherm() {
  fill("#393E46");
  rect(50, 50, 850, 400, 50);
  fill('white');
  textSize(50);
  text("wat is het beste weer tussen:", 70, 100);
}

function kaart() {
  fill("#393E46");
  rect(1000, 50, 850, 850, 50);
}

function bestetijd() {
  fill("#393E46");
  rect(50, 500, 850, 400, 50);
  fill("#222831")
  rect(400, 550, 450, 300, 20)
  image(icons, 420, 550, 150, 150)
  textAlign(CENTER);
  fill('white')
  text(`${temperature}°C`, 510, 750);
  text(`${windsnelheid} km/h`, 730, 750);
    push();
    angleMode(DEGREES);
    translate(720, 630);
    rotate(windgraden);
    imageMode(CENTER);
    image(windrichting, 0, 0, 100, 100);
    pop();
  textAlign(LEFT);
}

function updateData() {
  const weatherIconCode = "04n";
    icons = loadImage(  `https://rodrigokamada.github.io/openweathermap/images/${weatherIconCode}_t.png`
    );
  windgraden = 30;
}