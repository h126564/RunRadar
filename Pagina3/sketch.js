function pagina3(p) {
  let icons;
  let temperature = 6;
  let windsnelheid = 21;
  let timeDropdown1, timeDropdown2;

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
    zoekscherm();
    kaart();
    bestetijd();
  }

  function zoekscherm() {
    // Draw the background card
    p.fill("#222831"); // Darker shade for better contrast
    p.rect(50, 50, 850, 400, 50);
  
    // Add a border to the card
    p.stroke("#FFD369"); // Accent color
    p.strokeWeight(4);
    p.noFill();
    p.rect(50, 50, 850, 400, 50);
    p.noStroke();
  
    // Title text
    p.fill('white');
    p.textSize(50);
    p.textFont('Georgia'); // A serif font for elegance
    p.textAlign(p.LEFT, p.CENTER);
    p.text("Wat is het beste weer tussen:", 70, 100);
  
    // Style for the dropdown menus
    let dropdownStyle = {
      backgroundColor: "#FFD369",
      color: "#222831",
      border: "none",
      borderRadius: "10px",
      padding: "5px",
      fontSize: "20px"
    };
  
    // Create first dropdown menu for the first time
    timeDropdown1 = p.createSelect();
    timeDropdown1.position(100, 200);
    styleDropdown(timeDropdown1, dropdownStyle);
    populateTimes(timeDropdown1);
  
    // Create second dropdown menu for the second time
    timeDropdown2 = p.createSelect();
    timeDropdown2.position(300, 200);
    styleDropdown(timeDropdown2, dropdownStyle);
    populateTimes(timeDropdown2);
  
    // Add labels for dropdowns
    p.textSize(25);
    p.text("Starttijd:", 100, 170);
    p.text("Eindtijd:", 300, 170);
  }
  
  // Helper function to populate dropdown with times
  function populateTimes(dropdown) {
    for (let hour = 0; hour < 24; hour++) {
      let time = `${hour.toString().padStart(2, '0')}:00`;
      dropdown.option(time);
    }
  }
  
  // Helper function to apply styles to dropdown
  function styleDropdown(dropdown, style) {
    dropdown.style('background-color', style.backgroundColor);
    dropdown.style('color', style.color);
    dropdown.style('border', style.border);
    dropdown.style('border-radius', style.borderRadius);
    dropdown.style('padding', style.padding);
    dropdown.style('font-size', style.fontSize);
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
