const startInput = document.getElementById("startLocationField");
const startSearchButton = document.getElementById("startSearchButton");
const endInput = document.getElementById("endLocationField");
const endSearchButton = document.getElementById("endSearchButton");

startSearchButton.onclick = function(){
  updateLocation(startSearchButton.value, 0);
}
endSearchButton.onclick = function(){
  updateLocation(endSearchButton.value, 1)
}

let storageObject = {
  hasUpdated: false,
  locationData: {
      lat: 0,
      lon: 0,
  },
  RouteData: {
    startLat: 0,
    startLon: 0,
    endLat: 0,
    startLon: 0,
  },
  Meteo15MinuteData: {},
  MeteoweatherAPIData: {},
  OpenWeatherAPIData: {},
  
};
let apiResponse = {};
function updateLocation(){
  // Define the API URL
  
  const apiUrl = 'https://geocode.maps.co/search?q=' +  "Helinium"  + '&api_key=67346201ecee5360511634fte9d92c5';

  // Make a GET request
  fetch(apiUrl)
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      if(data.length == 0){
          alert("Locatie niet gevonden");
          throw new Error('Parameter is not a location!');
      }
      apiResponse=data[0];
      storageObject.locationData.lat = apiResponse.lat;
      storageObject.locationData.lon = apiResponse.lon;
      updateWeatherData(storageObject.locationData.lon, storageObject.locationData.lat);
  })
  .catch(error => {
      console.error('Error:', error);
  });

};

function updateLocation(locationName, startOrEnd){
  // Define the API URL
  
  const apiUrl = 'https://geocode.maps.co/search?q=' +  locationName  + '&api_key=67346201ecee5360511634fte9d92c5';

  // Make a GET request
  fetch(apiUrl)
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      if(data.length == 0){
          alert("Locatie niet gevonden");
          throw new Error('Parameter is not a location!');
      }
      apiResponse=data[0];
      if(startOrEnd == 0){

      }
      storageObject.locationData.lat = apiResponse.lat;
      storageObject.locationData.lon = apiResponse.lon;
      updateWeatherData(storageObject.locationData.lon, storageObject.locationData.lat);
  })
  .catch(error => {
      console.error('Error:', error);
  });

};



function updateWeatherData(lon, lat ){
  if(Object.keys(storageObject.locationData).length === 0){
      throw new Error('No location data stored');
  }
  //make open meteo calls
  /*
  const openMeteoApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude='+ lon + '&hourly=relative_humidity_2m,surface_pressure&daily=sunrise,sunset&timezone=auto';
  fetch(openMeteoApiUrl).then(response=> {
      if(!response.ok){
          throw new Error('Openmeteo niet te bereiken')
      }
      return response.json();
  })
  .then(data => {
      storageObject.MeteoweatherAPIData = data;
      console.log(storageObject.MeteoweatherAPIData)
  })
      */
  const openMeteo15ApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude='+ lon + '&minutely_15=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&forecast_minutely_15=24';
  fetch(openMeteo15ApiUrl).then(response=> {
      if(!response.ok){
          throw new Error('Openmeteo niet te bereiken')
      }
      return response.json();
  })
  .then(data => {
      storageObject.Meteo15MinuteData = data;
      storageObject.hasUpdated = true;
      console.log(storageObject.Meteo15MinuteData)
  })

  

  /*const openWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon='+ lon + '&appid=c147b5c83a42fbf37236c537fb83e881';
  fetch(openWeatherApiUrl).then(response=> {
      if(!response.ok){
          throw new Error('Openmeteo niet te bereiken')
      }
      return response.json();
  })
  .then(data => {
      storageObject.OpenWeatherAPIData = data;
      console.log(storageObject.OpenWeatherAPIData)
      
  })
*/
  
}

function pagina2(p) {
  let icons = [];
  let windgraden = 230;
  let windsnelheid = 21;
  let windrichting;

  p.setup = function() {
    p.createCanvas(1890, 930);
    p.background("#222831");
    updateData();
  }

  p.preload = function() {
    windrichting = p.loadImage("Pagina2/direction.png");
  }

  p.draw = function() {
    p.translate(0, p.height * 0.05); 
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
    p.push()
    p.translate(0, -30); 
    p.fill("#393E46");
    p.rect(50, 500, 1800, 400, 50);

    p.fill("white");
    p.textSize(60);
    p.text("Weer op deze route", 116, 580);
    p.textAlign(p.CENTER);

    let currentTime = roundedTime();
    p.fill("#222831");

    for (let i = 0; i < 13; i++) {
      if(!storageObject.hasUpdated){
        p.pop()
        return;
      }
      let x = 116 + i * 130;
      let hours = currentTime.getHours();
      let minutes = currentTime.getMinutes();
      let formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

      p.rect(x, 610, 100, 250, 10);
      p.fill("white");
      p.textSize(30);
      p.text(formattedTime, x + 48, 650);
      p.text(`${Math.round(storageObject.Meteo15MinuteData.minutely_15.temperature_2m[i])}°C`, x + 48, 735);
      p.textSize(25);
      p.text(`${Math.round(storageObject.Meteo15MinuteData.minutely_15.wind_speed_10m[i])} km/h`, x + 48, 840);
      p.image(icons[i], x + 5, 635, 90, 90);

      p.push();
      p.angleMode(p.DEGREES);
      p.translate(x + 50, 775);
      p.rotate(storageObject.Meteo15MinuteData.minutely_15.wind_direction_10m[i]+180);
      p.imageMode(p.CENTER);
      p.image(windrichting, 0, 0, 50, 50);
      p.pop();

      currentTime.setMinutes(currentTime.getMinutes() + 15);
      p.fill("#222831");
    }

    p.textAlign(p.LEFT);
    p.pop()
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
