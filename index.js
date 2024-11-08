function graph1(p) {
    p.setup = function () {
      p.createCanvas(720, 200);
      p.background(0);
    };
    p.draw = function () {
      p.circle(p.mouseX, p.mouseY, 50);
    };
  };
  new p5(graph1);