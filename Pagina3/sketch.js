function pagina3(p) {
  let icons;
  let temperature = 0
  let windsnelheid = 0
  let windgraden = 0;
  let timeDropdown1, timeDropdown2;
  let selectedTime1 = "00:00";
  let selectedTime2 = "00:00";
  let weatherData;
  let bestTimeText = "Loading...";
  besttimeload = false

  p.setup = function () {
    p.createCanvas(1890, 950);
    p.background("#222831");
    fetchWeatherData();
  };

  p.preload = function () {
    windrichting = p.loadImage("Pagina3/direction.png");
  };

  p.draw = function () {
    p.translate(0, p.height * 0.04);
    if (!timeDropdown1 && !timeDropdown2) {
      zoekscherm();
    }

    p.fill("#222831");
    p.rect(100, 200, 750, 100, 20);
    p.fill("white");
    p.textSize(30);
    p.text(`Geselecteerde tijd: ${selectedTime1} - ${selectedTime2}`, 120, 250);
    kaart();
    bestetijd();
  };

  function zoekscherm() {
    p.fill("#393E46");
    p.rect(50, 50, 850, 400, 50);
    p.fill("white");
    p.textSize(50);
    p.text("Wat is het beste weer tussen:", 70, 100);

    // First dropdown menu
    timeDropdown1 = p.createSelect();
    timeDropdown1.position(333, 220);
    timeDropdown1.style("font-size", "20px");
    for (let hour = 0; hour < 24; hour++) {
      let time = `${hour.toString().padStart(2, "0")}:00`;
      timeDropdown1.option(time);
    }
    timeDropdown1.changed(updateTime1);

    // Second dropdown menu
    timeDropdown2 = p.createSelect();
    timeDropdown2.position(567, 220);
    timeDropdown2.style("font-size", "20px");
    for (let hour = 0; hour < 24; hour++) {
      let time = `${hour.toString().padStart(2, "0")}:00`;
      timeDropdown2.option(time);
    }
    timeDropdown2.changed(updateTime2);
  }

  function updateTime1() {
    selectedTime1 = timeDropdown1.value();
    findBestTime();
  }

  function updateTime2() {
    selectedTime2 = timeDropdown2.value();
    findBestTime();
  }

  function kaart() {
    p.fill("#393E46");
    p.rect(1000, 50, 850, 850, 50);
  }

  function bestetijd() {
    p.fill("#393E46");
    p.rect(50, 500, 850, 400, 50);
    if(besttimeload = true){
    p.fill("#222831");
    p.rect(400, 550, 450, 300, 20);
    if (icons) p.image(icons, 420, 550, 150, 150);
    p.textAlign(p.CENTER);
    p.fill("white");
    p.text(`${Math.round(temperature)}°C`, 510, 750);
    p.text(`${Math.round(windsnelheid)} km/h`, 730, 750);

    p.push();
    p.angleMode(p.DEGREES);
    p.translate(720, 630);
    p.rotate(windgraden);
    p.imageMode(p.CENTER);
    p.image(windrichting, 0, 0, 100, 100);
    p.pop();

    // Display the best time
    p.fill("#222831")
    p.rect(100, 550, 250, 300, 20)
    p.textAlign(p.LEFT);
    p.textSize(20);
    p.fill("white");
    p.text(bestTimeText, 120, 700);
    } else if(besttimeload = false){
      p.fill('white')
      p.text('Vul eerst twee tijden in', 120, 700)
    }
  }

  async function fetchWeatherData() {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=51.826&lon=4.118&appid=c147b5c83a42fbf37236c537fb83e881&units=metric"
      );
      weatherData = await response.json();
      findBestTime();
    } catch (error) {
      bestTimeText = "Failed to load weather data.";
    }
  }

  function findBestTime() {
    if (!weatherData) {
      bestTimeText = "Weather data not loaded yet.";
      besttimeload = false
      return;
    }

    const startTime = parseInt(selectedTime1.split(":")[0]);
    const endTime = parseInt(selectedTime2.split(":")[0]);

    if (isNaN(startTime) || isNaN(endTime) || startTime >= endTime) {
      bestTimeText = "Ongeldige time range";
      besttimeload = false
      return;
    }

    let bestConditions = Infinity;
    let bestForecast = null;

    for (const forecast of weatherData.list) {
      const forecastTime = new Date(forecast.dt * 1000);
      const hour = forecastTime.getHours();

      if (hour >= startTime && hour <= endTime) {
        const score =
          forecast.main.temp - Math.abs(forecast.wind.speed) +
          (forecast.weather[0].main === "Clear" ? 10 : 0);

        if (score < bestConditions) {
          bestConditions = score;
          bestForecast = forecast;
        }
      }
    }

    if (bestForecast) {
      const bestTime = new Date(bestForecast.dt * 1000);
      bestTimeText = `Beste tijd: ${bestTime.getHours()}:00`;
      besttimeload = true
      temperature = bestForecast.main.temp;
      windsnelheid = bestForecast.wind.speed;
      icons = p.loadImage(
        `https://openweathermap.org/img/wn/${bestForecast.weather[0].icon}.png`
      );
      windgraden = bestForecast.wind.deg;
    } else {
      bestTimeText = "Geen geschikte tijd gevonden.";
    }
  }
}

new p5(pagina3);
