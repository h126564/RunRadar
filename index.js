let storageObject = {
    long: 0, 
    lat: 0,
    weatherAPIData,
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
        console.log(data);
        apiResponse=data[0];
        console.log(apiResponse)
        storageObject.lat = data.lat;
        storageObject.long = data.lon;
    })
    .catch(error => {
        console.error('Error:', error);
    });

};
