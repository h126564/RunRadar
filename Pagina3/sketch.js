function pagina3(p) {
  let icons;
  let temperature = 6;
  let windsnelheid = 21;

  p.setup = function() {
    p.createCanvas(1900, 972);
    p.background("#222831");
    updateData();
  }

  p.preload = function() {
    windrichting = p.loadImage("Pagina3/direction.png");
  }

  p.draw = function() {
    zoekscherm();
    kaart();
    bestetijd();
  }

  function zoekscherm() {
    p.fill("#393E46");
    p.rect(50, 50, 850, 400, 50);
    p.fill('white');
    p.textSize(50);
    p.text("wat is het beste weer tussen:", 70, 100);
  }

  function kaart() {
    p.fill("#393E46");
    p.rect(1000, 50, 850, 850, 50);
  }

  function bestetijd() {
    p.fill("#393E46");
    p.rect(50, 500, 850, 400, 50);
    p.fill("#222831")
    p.rect(400, 550, 450, 300, 20);
    p.image(icons, 420, 550, 150, 150);
    p.textAlign(p.CENTER);
    p.fill('white');
    p.text(`${temperature}°C`, 510, 750);
    p.text(`${windsnelheid} km/h`, 730, 750);

    p.push();
    p.angleMode(p.DEGREES);
    p.translate(720, 630);
    p.rotate(windgraden);
    p.imageMode(p.CENTER);
    p.image(windrichting, 0, 0, 100, 100);
    p.pop();

    p.textAlign(p.LEFT);
  }

  function updateData() {
    const weatherIconCode = "04n";
    icons = p.loadImage(
      `https://rodrigokamada.github.io/openweathermap/images/${weatherIconCode}_t.png`
    );
    windgraden = 30;
  }
}

new p5(pagina3);
