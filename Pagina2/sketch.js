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
    endLon: 0,
    isNew: false,
  },
  Meteo15MinuteData: {},
  MeteoweatherAPIData: {},
  OpenWeatherAPIData: {},
  
};

const startInput = document.getElementById("startLocationField");
const startSearchButton = document.getElementById("startSearchButton");
const endInput = document.getElementById("endLocationField");
const endSearchButton = document.getElementById("endSearchButton");

var platform = new H.service.Platform({
  'apikey': '-bJgWNtBmfKXtY55Bd2tEZQdK8yU76wQhoI9Vy_NBZk'
});
// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
      zoom: 10,
      center: { lat: 52.5, lng: 13.4 }
});

let routingParameters = {
  routingMode: "fast",
  transportMode: "bicycle",
  // The start point of the route:
  origin: `${storageObject.RouteData.startLat},${storageObject.RouteData.startLon}`,
  // The end point of the route:
  destination: `${storageObject.RouteData.endLat},${storageObject.RouteData.endLon}`,
  // Include the route shape in the response
  return: "polyline",
};

const onResult = function (result) {
  // Ensure that at least one route was found
  if (result.routes.length) {
    const lineStrings = [];
    result.routes[0].sections.forEach((section) => {
      // Create a linestring to use as a point source for the route line
      lineStrings.push(H.geo.LineString.fromFlexiblePolyline(section.polyline));
    });

    // Create an instance of H.geo.MultiLineString
    const multiLineString = new H.geo.MultiLineString(lineStrings);

    // Create a polyline to display the route:
    const routeLine = new H.map.Polyline(multiLineString, {
      style: {
        strokeColor: "blue",
        lineWidth: 3,
      },
    });

    // Create a marker for the start point:
    const startMarker = new H.map.Marker(origin);

    // Create a marker for the end point:
    const endMarker = new H.map.Marker(destination);

    // Create a H.map.Group to hold all the map objects and enable us to obtain
    // the bounding box that contains all its objects within
    const group = new H.map.Group();
    group.addObjects([routeLine, startMarker, endMarker]);
    // Add the group to the map
    map.addObject(group);

    // Set the map viewport to make the entire route visible:
    map.getViewModel().setLookAtData({
      bounds: group.getBoundingBox(),
    });
  }
};
const router = platform.getRoutingService(null, 8);

startSearchButton.onclick = function(){
  updateLocation(startSearchButton.value, 0);
}
endSearchButton.onclick = function(){
  updateLocation(endSearchButton.value, 1)
}


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
        storageObject.RouteData.startLat = apiResponse.lat;
        storageObject.RouteData.startLon = apiResponse.lon;
      }else if (startOrEnd == 1){
        storageObject.RouteData.endLat = apiResponse.lat;
        storageObject.RouteData.endLon = apiResponse.lon;
      }
      storageObject.RouteData.isNew=true;
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
    mapUpdate();
    p.translate(0, p.height * 0.05); 
    zoekscherm();
    kaart();
    weeroproute();
  }


  function mapUpdate(){
    if(storageObject.RouteData.isNew){
      storageObject.RouteData.isNew=false;
      if((storageObject.RouteData.startLat == 0 && storageObject.RouteData.startLon ==0) || (storageObject.RouteData.endLat ==0 && storageObject.RouteData.endLon ==0)){
        storageObject.RouteData.isNew=true;
        return;
      }

    }else{
      return;
    }

    routingParameters = {
      routingMode: "fast",
      transportMode: "bicycle",
      // The start point of the route:
      origin: `${storageObject.RouteData.startLat},${storageObject.RouteData.startLon}`,
      // The end point of the route:
      destination: `${storageObject.RouteData.endLat},${storageObject.RouteData.endLon}`,
      // Include the route shape in the response
      return: "polyline",
    };
    router.calculateRoute(routingParameters, onResult, function (error) {
      alert(error.message);
    });
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    
    
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
