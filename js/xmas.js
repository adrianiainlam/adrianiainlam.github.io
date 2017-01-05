function sketch(p) {
  var t = [
    my_triangle(new Coordinate(150, 20), 40, 60),
    my_triangle(new Coordinate(150, 40), 60, 90),
    my_triangle(new Coordinate(150, 65), 80, 120),
  ];
  var tree_vertices = [ // obtained by intersecting the triangles in GeoGebra
    new Coordinate(150, 20),
    new Coordinate(120, 60),
    new Coordinate(135, 60),
    new Coordinate(105, 100),
    new Coordinate(123.75, 100),
    new Coordinate(90, 145),
    new Coordinate(210, 145),
    new Coordinate(176.25, 100),
    new Coordinate(195, 100),
    new Coordinate(165, 60),
    new Coordinate(180, 60)
  ];
  var star_vertices = [
    new Coordinate(145.7, 23.1),
    new Coordinate(150, 19.98),
    new Coordinate(154.3, 23.1),
    new Coordinate(152.66, 18.05),
    new Coordinate(156.96, 14.92),
    new Coordinate(151.64, 14.92),
    new Coordinate(150, 9.87),
    new Coordinate(148.36, 14.92),
    new Coordinate(143.04, 14.92),
    new Coordinate(147.34, 18.05)
  ];

  function Coordinate(x, y) {
    this.x = x;
    this.y = y;
  }
  
  function my_triangle(vertex, height, base) {
    // list of vertices of an isosceles triangle with base parallel to x-axis
    // and 1st vertex pointing upwards
    var v2 = new Coordinate(vertex.x - base / 2, vertex.y + height);
    var v3 = new Coordinate(vertex.x + base / 2, vertex.y + height);
    return [vertex, v2, v3];
  }
  
  function point_in_triangle(point, triangle) {
    if(point.y > triangle[1].y) return 0;
    if(point.y < triangle[0].y) return 0;
    if(point.x < triangle[1].x) return 0;
    if(point.x > triangle[2].x) return 0;
    var x_dist_to_centre = Math.abs(triangle[0].x - point.x);
    var y_dist_to_top = Math.abs(point.y - triangle[0].y);
    if(x_dist_to_centre / y_dist_to_top > (triangle[0].x - triangle[1].x) / (triangle[1].y - triangle[0].y)) return 0;
    return 1;
  }
  
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  // Returns a random integer between min (included) and max (excluded)
  // Using Math.round() will give you a non-uniform distribution!
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function draw_tree(alpha=50) {
    p.stroke(0, alpha);
    p.strokeWeight(5);
    p.fill(0, 80, 0, alpha);
    p.beginShape();
    for(var i = 0; i < tree_vertices.length; i++) {
      p.vertex(tree_vertices[i].x, tree_vertices[i].y);
    }
    p.endShape(p.CLOSE);
    p.noStroke();
    
    p.fill(80, 40, 0);
    p.rect(130, 145, 40, 30);
    p.beginShape();
    p.fill(255, 255, 0);
    for(var i = 0; i < star_vertices.length; i++) {
      p.vertex(star_vertices[i].x, star_vertices[i].y);
    }
    p.endShape(p.CLOSE);
  }
  
  p.setup = function() {
    p.size(300, 200);
    p.background(0);
    p.frameRate(10);
    draw_tree(alpha=255);
  };
  
  p.draw = function() {
    draw_tree();
    p.noStroke();
    var pt = new Coordinate(0, 0);
    do {
      pt.x = getRandomInt(0, p.width);
      pt.y = getRandomInt(0, p.height);
    } while(!(point_in_triangle(pt, t[0]) || point_in_triangle(pt, t[1]) || point_in_triangle(pt, t[2])));
    var color = [0, 0, 0];
    color[getRandomInt(0, 3)] = 255;
    p.fill.apply(null, color);
    p.ellipse(pt.x, pt.y, 5, 5);
  };
}

var c = document.getElementById("tree-canvas");
var inst = new Processing(c, sketch);
