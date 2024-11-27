let storageObject = {
    locationData: {
        lat: 0,
        lon: 0,
    },
    MeteoweatherAPIData: {},
};
const input = document.getElementById("locationfield");
const searchButton = document.getElementById("searchButton");
let apiResponse = {};
searchButton.onclick = function(){
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
        console.log("openmeteo data");
        console.log(data);
        storageObject.MeteoweatherAPIData = data;
        console.log(data.hourly.surface_pressure[1])
    })




}