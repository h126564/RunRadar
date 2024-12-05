

function pagina1(p) {
let count = 0;
let icons = [];
let temperature = 6;
let temperaturefeelslike = 2;
let windrichting;
let icons2;
let newIcons = [];
let oldIcons = [];
let clouds;
let firstCall = true;
let firstdraw = true;
let mask;

  p.setup = function() {
    p.createCanvas(1890, 930);
    p.background("#222831");
    updateData();
    for(let i = 0; i < 7; i++){
      newIcons[i] = icons2;
      oldIcons[i] = icons2;
    }
    mask = p.createGraphics(850, 850);
    
  }

  p.preload = function() {
    windrichting = p.loadImage("pagina1/direction.png");
    clouds = p.loadImage("pagina1/clouds.jpg");
    sunset = p.loadImage("pagina1/sunset.png");
    sunrise = p.loadImage("pagina1/sunrise.png");
    pressure = p.loadImage("pagina1/pressure.png");
    humidity = p.loadImage("pagina1/humidity.png");
  }

  p.draw = function() {
    if(storageObject.firstCall){
      firstCall = true;
      storageObject.firstCall = false;
    }
    count++;
    if(count == 2){
      updateData();
    }else if(count > 10){
      firstCall = true;
      count = 0;
    }
    p.translate(0, p.height * 0.04);
    peruur();
    weervandaag();
    tweedaagse();
  }

  function getDayInDutch(date) {
    const dagen = [
      "zondag", "maandag", "dinsdag", "woensdag", "donderdag", 
      "vrijdag", "zaterdag"
    ];
    return dagen[date.getDay()];
  }

  function getMonthInDutch(date) {
    const maanden = [
      "januari", "februari", "maart", "april", "mei", "juni", 
      "juli", "augustus", "september", "oktober", "november", "december"
    ];
    return maanden[date.getMonth()];
  }

  function updateDates() {
    let morgen = new Date();
    let overmorgen = new Date();
    morgen.setDate(morgen.getDate() + 1);
    overmorgen.setDate(overmorgen.getDate() + 2);

    const morgenDag = getDayInDutch(morgen);
    const morgenDatum = `${morgenDag} ${morgen.getDate()} ${getMonthInDutch(morgen)}`;
    const overmorgenDag = getDayInDutch(overmorgen);
    const overmorgenDatum = `${overmorgenDag} ${overmorgen.getDate()} ${getMonthInDutch(overmorgen)}`;

    return { morgenDatum, overmorgenDatum };
  }

  function updateData() {
    const weatherIconCode = "04n";
    
    icons2 = p.loadImage(`https://rodrigokamada.github.io/openweathermap/images/${weatherIconCode}_t.png`);
    if(!storageObject.hasBeenUpdated){
      for (let i = 0; i < 7; i++) {
        newIcons[i] = p.loadImage(`https://rodrigokamada.github.io/openweathermap/images/${weatherIconCode}_t.png`);
        icons[i] = p.loadImage(`https://rodrigokamada.github.io/openweathermap/images/${weatherIconCode}_t.png`);
      }
      return;
    }
    for (let i = 0; i < 7; i++) {
      
      newIcons[i] = p.loadImage(
        `https://rodrigokamada.github.io/openweathermap/images/${storageObject.OpenWeatherAPIData.list[i].weather[0].icon}_t.png`
      );
    }
    let shouldUpdate = false;
    for(let i = 0; i < 7; i++){
      if(icons[i] !== newIcons[i]){
        shouldUpdate = true
      }
    }
    if(shouldUpdate){
      icons = newIcons;
      setTimeout(function() {  
        oldIcons = icons
      }, 100);

    }
  }

  function peruur() {
    if(!storageObject.hasBeenUpdated){
      return;
    }
    if(firstdraw){
      firstCall=true;
      firstdraw = false;
    }
    if(firstCall){
      p.fill("#393E46");
      p.rect(50, 50, 900, 400, 50);
      p.fill("white");
      p.textSize(70);
      p.text("Per uur", 80, 120);
      p.fill("#222831");
      
    }
    

    let currentTime = roundedTime();

    for (let i = 0; i < 7; i++) {
      let x = 80 + i * 123;
      if(firstCall){
        p.fill("#222831");
        p.rect(x, 150, 100, 250, 10);
        p.image(icons[i], x + 5, 180, 90, 90);
      }
      
      p.fill("white");
      p.textSize(30);
      p.textAlign(p.CENTER);
      
      let hours = currentTime.getHours();
      let minutes = currentTime.getMinutes();
      let formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
      p.text(formattedTime, x + 48, 190);
      p.text(`${Math.round(storageObject.OpenWeatherAPIData.list[i].main.temp - 273.15)}°C`, x + 48, 280);
      currentTime.setHours(currentTime.getHours() + 3);
      p.textSize(25);
      p.text(`${Math.round(storageObject.OpenWeatherAPIData.list[i].wind.speed * 3600 / 1000)} km/h`, x + 50, 380);
      p.push();
      p.angleMode(p.DEGREES);
      p.translate(x + 50, 325);
      p.rotate(storageObject.OpenWeatherAPIData.list[i].wind.deg + 180);
      p.imageMode(p.CENTER);
      p.image(windrichting, 0, 0, 50, 50);
      p.pop();
    }
    if(firstCall){
      firstCall= false;
    }
    p.textAlign(p.LEFT);
  }

  function weervandaag() {
    if(!storageObject.hasBeenUpdated){
      return;
    }
    p.fill("#393E46AA");
    drawRoundedImage(clouds, 1000, 50, 850, 850, 50);
    p.rectMode(p.CENTER);
    p.noStroke();
    p.rect(1425, 150, 500, 100, 50);
    p.rect(1425, 550, 750, 650, 50);
    p.rectMode(p.CORNER);
    p.stroke("black");
    p.fill("white");
    let String = storageObject.locationData.name;
    let A = p.split(String, ','); 
    let reverseA = p.reverse(A)
    if(reverseA.length == 0){
      return;
    }
    let rectX = 1425;
    let rectY = 150;
    let rectWidth = 500;
    let rectHeight = 100;
    let textSizeValue = 1;
    p.textSize(textSizeValue);
    while (
      p.textWidth(reverseA[3]) < rectWidth - 20 &&
      p.textAscent() + p.textDescent() < rectHeight - 20
    ) {
      textSizeValue++;
      p.textSize(textSizeValue);
    }
    textSizeValue--;
    if(textSizeValue < 30){
      textSizeValue = 30;
    }
    p.textSize(textSizeValue);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(reverseA[3], -250 + rectX + rectWidth / 2, -50 + rectY + rectHeight / 2);
    p.textAlign(p.CENTER)
    p.textSize(70)
    p.text(`${Math.round(storageObject.OpenWeatherAPIData.list[0].main.temp - 273.15)}°C`, 1425, 280);
    p.textSize(40)
    p.text(`Voelt aan als: ${Math.round(storageObject.OpenWeatherAPIData.list[0].main.feels_like - 273.15)}°C`, 1425, 330);
    p.textAlign(p.LEFT);

    p.image(sunset, 1080, 400);
    p.image(sunrise, 1080, 600);
    p.image(humidity, 1420, 400);
    p.image(pressure, 1420, 600);
    p.textSize(30)
    p.text('Zonsondergang:', 1185, 420);
    p.text(storageObject.OpenWeatherAPIData.list[0].sys.sunset, 1185, 465);
    p.text('Zonsopkomst:', 1185, 620);
    p.text(storageObject.OpenWeatherAPIData.list[0].sys.sunrise, 1185, 665);
    p.text('Luchtvochtigheid:', 1525, 420);
    p.text(storageObject.OpenWeatherAPIData.list[0].main.humidity + '%', 1525, 465);
    p.text('Luchtdruk', 1525, 620);
    p.text(storageObject.OpenWeatherAPIData.list[0].main.pressure + 'hPa', 1525, 665);
  }

  function tweedaagse() {
    if(firstCall){
      p.fill("#393E46");
      p.rect(50, 500, 900, 400, 50);
      p.fill("#222831");
      p.rect(80, 580, 405, 300, 30);
      p.rect(515, 580, 405, 300, 30);
      p.fill("white");
      p.textSize(60);
      p.text("2-daagse verwachting", 80, 540);
      p.textSize(30);
      p.text("Morgen:", 100, 610);
      p.text("Overmorgen:", 535, 610);
      p.image(icons2, 80, 650, 200, 200);
      p.image(icons2, 515, 650, 200, 200);
      firstCall = false;
    }
    
    const { morgenDatum, overmorgenDatum } = updateDates();
    p.textSize(30);
    p.text(morgenDatum, 100, 645);
    p.text(overmorgenDatum, 535, 645);
    
    p.textSize(70);
    p.text(`${temperature}°C`, 310, 775);
    p.text(`${temperature}°C`, 745, 775);
  }

  function drawRoundedImage(img, x, y, w, h, r) {
    
    
    mask.fill(255);
    mask.noStroke();
    mask.rect(0, 0, w, h, r);
    img.mask(mask);
    p.image(img, x, y, w, h);
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
}

new p5(pagina1);
