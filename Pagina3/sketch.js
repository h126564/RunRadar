function pagina3(p) {
  let icons;
  let temperature = 6;
  let windsnelheid = 21;
  let timeDropdown1, timeDropdown2;
  let selectedTime1 = "00:00"; 
  let selectedTime2 = "00:00";

  p.setup = function() {
    p.createCanvas(1890, 972);
    p.background("#222831");
    updateData();
  }

  p.preload = function() {
    windrichting = p.loadImage("Pagina3/direction.png");
  }

  p.draw = function() {
    p.translate(0, p.height * 0.05); 
    if (!timeDropdown1 && !timeDropdown2) {
      zoekscherm();
    }
  
    p.fill("#222831");
    p.rect(100, 200, 750, 100, 20); 
    p.fill('white');
    p.textSize(30);
    p.text(`Geselecteerde tijd: ${selectedTime1} - ${selectedTime2}`, 120, 250);
    kaart();
    bestetijd();
  }

  function zoekscherm() {
    p.fill("#393E46");
    p.rect(50, 50, 850, 400, 50);
    p.fill('white');
    p.textSize(50);
    p.text("Wat is het beste weer tussen:", 70, 100);
  
    // Create first dropdown menu for the first time
    timeDropdown1 = p.createSelect();
    timeDropdown1.position(233, 220); // Position it on the canvas
    timeDropdown1.style('font-size', '20px'); // Style the dropdown
    for (let hour = 0; hour < 24; hour++) {
      let time = `${hour.toString().padStart(2, '0')}:00`; // Format time as HH:00
      timeDropdown1.option(time);
    }
    timeDropdown1.changed(updateTime1); // Add event listener to update time
  
    // Create second dropdown menu for the second time
    timeDropdown2 = p.createSelect();
    timeDropdown2.position(467, 250); // Position it on the canvas
    timeDropdown2.style('font-size', '20px'); // Style the dropdown
    for (let hour = 0; hour < 24; hour++) {
      let time = `${hour.toString().padStart(2, '0')}:00`; // Format time as HH:00
      timeDropdown2.option(time);
    }
    timeDropdown2.changed(updateTime2); // Add event listener to update time
  }

  function updateTime1() {
    selectedTime1 = timeDropdown1.value(); // Get selected value
  }
  
  function updateTime2() {
    selectedTime2 = timeDropdown2.value(); // Get selected value
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
