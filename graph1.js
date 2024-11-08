function graph1(p) {
  colorMode(RGB)
    p.setup = function () {
      p.createCanvas(window.innerWidth, 200);
      p.background(color("#212121"));
    };
    p.draw = function () {
      p.circle(p.mouseX, p.mouseY, 50);
    };
  };
  new p5(graph1);

