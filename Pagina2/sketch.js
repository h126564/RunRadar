function pagina2(p) {
  let icons = [];
  let temperature = 6;
  let windgraden = 230;
  let windsnelheid = 21;
  let windrichting;

  p.setup = function() {
    p.createCanvas(1890, 972);
    p.background("#222831");
    updateData();
  }

  p.preload = function() {
    windrichting = p.loadImage("Pagina2/direction.png");
  }

  p.draw = function() {
    p.translate(0, p.height * 0.02); 
    zoekscherm();
    kaart();
    weeroproute();
  }

  function zoekscherm() {
    p.fill("#393E46");
    p.rect(50, 50, 1000, 400, 50);

    p.fill("white");
    p.textSize(60);
    p.text("Startlocatie", 150, 150);
    p.text("Eindlocatie", 650, 150);
  }

  function kaart() {
    p.fill("#393E46");
    p.rect(1150, 50, 700, 400, 50);
  }

  function weeroproute() {
    p.fill("#393E46");
    p.rect(50, 500, 1800, 400, 50);

    p.fill("white");
    p.textSize(60);
    p.text("Weer op deze route", 116, 580);
    p.textAlign(p.CENTER);

    let currentTime = roundedTime();
    p.fill("#222831");

    for (let i = 0; i < 13; i++) {
      let x = 116 + i * 130;
      let hours = currentTime.getHours();
      let minutes = currentTime.getMinutes();
      let formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

      p.rect(x, 610, 100, 250, 10);
      p.fill("white");
      p.textSize(30);
      p.text(formattedTime, x + 48, 650);
      p.text(`${temperature}°C`, x + 48, 735);
      p.textSize(25);
      p.text(`${windsnelheid} km/h`, x + 48, 840);
      p.image(icons[i], x + 5, 635, 90, 90);

      p.push();
      p.angleMode(p.DEGREES);
      p.translate(x + 50, 775);
      p.rotate(windgraden);
      p.imageMode(p.CENTER);
      p.image(windrichting, 0, 0, 50, 50);
      p.pop();

      currentTime.setMinutes(currentTime.getMinutes() + 15);
      p.fill("#222831");
    }

    p.textAlign(p.LEFT);
  }

  function updateData() {
    const weatherIconCode = "04n";
    for (let i = 0; i < 13; i++) {
      icons[i] = p.loadImage(
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
}

new p5(pagina2);
