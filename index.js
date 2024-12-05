let storageObject = {
    firstCall: false,
    hasBeenUpdated: false,
    locationData: {
        lat: 0,
        lon: 0,
        name: "",
    },
    MeteoweatherAPIData: {},
    OpenWeatherAPIData: {},

};
let storageObject1 = {
    OpenWeatherAPIData1: {},
    firstCall: false,
    hasBeenUpdated: false,
}

const input = document.getElementById("locationfield");
const searchButton = document.getElementById("searchButton");
let apiResponse = {};
searchButton.onclick = function(){
    storageObject.firstCall = true;
    storageObject1.firstCall = true
    // Define the API URL
    
    const apiUrl = 'https://geocode.maps.co/search?q=' + input.value  + '&api_key=67346201ecee5360511634fte9d92c5';

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
        storageObject.locationData.name = apiResponse.display_name;
        updateWeatherData();
    })
    .catch(error => {
        console.error('Error:', error);
    });

};


function updateWeatherData(){
    if(Object.keys(storageObject.locationData).length === 0){
        throw new Error('No location data stored');
    }
    //make open meteo calls
    const openMeteoApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + storageObject.locationData.lat + '&longitude='+ storageObject.locationData.lon + '&hourly=relative_humidity_2m,surface_pressure&daily=sunrise,sunset&timezone=auto';
    fetch(openMeteoApiUrl).then(response=> {
        if(!response.ok){
            throw new Error('Openmeteo niet te bereiken')
        }
        return response.json();
    })
    .then(data => {
        storageObject.MeteoweatherAPIData = data;
    })

    const openWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + storageObject.locationData.lat + '&lon='+ storageObject.locationData.lon + '&appid=c147b5c83a42fbf37236c537fb83e881';
    fetch(openWeatherApiUrl).then(response=> {
        if(!response.ok){
            throw new Error('Openmeteo niet te bereiken')
        }
        return response.json();
    })
    .then(data => {
        storageObject.OpenWeatherAPIData = data;
        console.log(storageObject.OpenWeatherAPIData)
        storageObject.hasBeenUpdated = true;
    })

    const openWeatherApiUrlnow = 'https://api.openweathermap.org/data/2.5/weather?lat=' + storageObject.locationData.lat + '&lon='+ storageObject.locationData.lon + '&appid=c147b5c83a42fbf37236c537fb83e881';
    fetch(openWeatherApiUrlnow).then(response=> {
        if(!response.ok){
            throw new Error('Openmeteo niet te bereiken')
        }
        return response.json();
    })
    .then(data => {
        storageObject1.OpenWeatherAPIDatanow = data;
        console.log(storageObject.OpenWeatherAPIDatanow)
        storageObject1.hasBeenUpdated = true;
    })



}