let icons = [];
let temperature = 6;
let temperaturefeelslike = 2
let windgraden = 30;
let windrichting;
let windsnelheid = 21;


function setup() {
  createCanvas(1900, 972);
  background("#222831");
  updateData();
}

function getDayInDutch(date) {
  const dagen = [
    "zondag",
    "maandag",
    "dinsdag",
    "woensdag",
    "donderdag",
    "vrijdag",
    "zaterdag",
  ];
  return dagen[date.getDay()];
}

function getMonthInDutch(date) {
  const maanden = [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december",
  ];
  return maanden[date.getMonth()];
}

function updateDates() {
  let morgen = new Date();
  let overmorgen = new Date();
  morgen.setDate(morgen.getDate() + 1);
  overmorgen.setDate(overmorgen.getDate() + 2);

  const morgenDag = getDayInDutch(morgen);
  const morgenDatum = `${morgenDag} ${morgen.getDate()} ${getMonthInDutch(
    morgen
  )}`;
  const overmorgenDag = getDayInDutch(overmorgen);
  const overmorgenDatum = `${overmorgenDag} ${overmorgen.getDate()} ${getMonthInDutch(
    overmorgen
  )}`;

  return { morgenDatum, overmorgenDatum };
}

function drawRoundedImage(img, x, y, w, h, r) {
  let mask = createGraphics(w, h);
  mask.fill(255);
  mask.noStroke();
  mask.rect(0, 0, w, h, r);
  img.mask(mask);
  image(img, x, y, w, h);
}

function mousePressed() {
  fullscreen(true);
}

function preload() {
  windrichting = loadImage("direction.png");
  clouds = loadImage("clouds.jpg");
  sunset = loadImage("sunset.png");
  sunrise = loadImage("sunrise.png");
  pressure = loadImage("pressure.png");
  humidity = loadImage("humidity.png");
}

function draw() {
  peruur();
  weervandaag();
  tweedaagse();
}

function peruur() {
  fill("#393E46");
  rect(50, 50, 900, 400, 50);
  fill("white");
  textSize(70);
  text("Per uur", 80, 120);
  fill("#222831");

  let currentTime = roundedTime();

  for (let i = 0; i < 7; i++) {
    let x = 80 + i * 123;
    fill("#222831");
    rect(x, 150, 100, 250, 10);
    fill("white");
    textSize(30);
    textAlign(CENTER);
    image(icons[i], x + 5, 180, 90, 90);
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    text(formattedTime, x + 48, 190);
    text(`${temperature}°C`, x + 48, 280);
    currentTime.setHours(currentTime.getHours() + 3);
    textSize(25);
    text(`${windsnelheid} km/h`, x + 50, 380);
    push();
    angleMode(DEGREES);
    translate(x + 50, 315);
    rotate(windgraden);
    imageMode(CENTER);
    image(windrichting, 0, 0, 50, 50);
    pop();
  }
  textAlign(LEFT);
}

function weervandaag() {
  fill("#393E46AA");
  drawRoundedImage(clouds, 1000, 50, 850, 850, 50);
  rectMode(CENTER);
  noStroke();
  rect(1425, 150, 500, 100, 50);
  rect(1425, 550, 750, 650, 50);
  rectMode(CORNER);
  stroke("black");
  fill("white");
  let textContent = "Hellevoetsuis";
  let rectX = 1425;
  let rectY = 150;
  let rectWidth = 500;
  let rectHeight = 100;
  let textSizeValue = 1;
  textSize(textSizeValue);
  while (
    textWidth(textContent) < rectWidth - 20 &&
    textAscent() + textDescent() < rectHeight - 20
  ) {
    textSizeValue++;
    textSize(textSizeValue);
  }
  textSizeValue--;
  textSize(textSizeValue);
  textAlign(CENTER, CENTER);
  text(textContent, -250 + rectX + rectWidth / 2, -50 + rectY + rectHeight / 2);
  textAlign(CENTER)
  textSize(70)
  text(`${temperature}°C`, 1425, 280);
  textSize(40)
  text(`Voelt aan als: ${temperaturefeelslike}°C`, 1425, 330);
  textAlign(LEFT);
  image(sunset,1080, 400)
  image(sunrise,1080, 600)
  image(humidity, 1420, 400)
  image(pressure, 1420, 600)
  textSize(30)
  text('Zonsondergang:',1185, 420)
  text('17:01',1185, 465)
  text('Zonsopkomst:',1185, 620)
  text('07:52',1185, 665)
  text('Luchtvochtigheid:', 1525, 420)
  text('83%', 1525, 465)
  text('Luchtdruk', 1525, 620)
  text('1025 hPa', 1525, 665)
}

function tweedaagse() {
  fill("#393E46");
  rect(50, 500, 900, 400, 50);
  fill("#222831");
  rect(80, 580, 405, 300, 30);
  rect(515, 580, 405, 300, 30);
  fill("white");
  textSize(60);
  text("2-daagse verwachting", 80, 540);
  textSize(30);
  text("Morgen:", 100, 610);
  text("Overmorgen:", 535, 610);
  const { morgenDatum, overmorgenDatum } = updateDates();
  text(morgenDatum, 100, 645);
  text(overmorgenDatum, 535, 645);
  image(icons2, 80, 650, 200, 200);
  image(icons2, 515, 650, 200, 200);
  textSize(70);
  text(`${temperature}°C`, 310, 775);
  text(`${temperature}°C`, 745, 775);
}

function updateData() {
  const weatherIconCode = "04n";
  for (let i = 0; i < 7; i++) {
    icons[i] = loadImage(
      `https://rodrigokamada.github.io/openweathermap/images/${weatherIconCode}_t.png`
    );
  }
  icons2 = loadImage(
    `https://rodrigokamada.github.io/openweathermap/images/${weatherIconCode}_t.png`
  );
}

function roundedTime() {
  let now = new Date();
  let hours = now.getHours();
  now.setMinutes(0, 0, 0);
  if (now.getMinutes() > 30) {
    now.setHours(hours + 1);
  }
  return now;
}
