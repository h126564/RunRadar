function graph1(p) {
    p.setup = function () {
      p.createCanvas(window.innerWidth, 200);
      p.background(p.color("#212121"));
    };
    p.draw = function () {
      p.circle(p.mouseX, p.mouseY, 50);
    };
  };
  new p5(graph1);

