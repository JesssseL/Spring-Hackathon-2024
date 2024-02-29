function Simulate() {
  for (var s of sticks) {
    if (run) {
      for (var i = 0; i < 100; i++) {
        var direction = p5.Vector.sub(s.pointB.pos, s.pointA.pos);
        direction = direction.normalize();
        var delta_D = getDistance(s.pointA.pos, s.pointB.pos) - s.length;
        var dM = direction.mult(delta_D);
        dM = dM.div(2);
        if (!s.pointA.locked) {
          s.pointA.pos.add(dM);
        }
        if (!s.pointB.locked) {
          s.pointB.pos.sub(dM);
        }
      }
    }
  }

  for (var p of points) {
    if (!p.locked && run) {
      let posBefore = p.pos.copy();
      if (p.pos.y < height - 20) {
        //apply gravity
        p.pos.add(p5.Vector.sub(p.pos, p.prevPos));
        p.pos.add(gravity.mult(1).mult(pow(1, deltaTime)));
      } else if (p.pos.y > height - 1) {
        //apply reverse gravity
        p.pos.sub(p5.Vector.sub(p.pos, p.prevPos).mult(1));
        p.pos.sub(gravity.mult(1).mult(pow(1, deltaTime)));
        continue;
      }
      //add wind vector
      p.pos.add(wind.mult(1).mult(pow(1, deltaTime)));
      if (p.pos.x > width) {
        //apply bounding edge 1
        p.pos.sub(p5.Vector.sub(p.pos, p.prevPos).mult(1));
        p.pos.add(bound.mult(1).mult(pow(1, deltaTime)));
        continue;
      } else if (p.pos.x < 0) {
        p.pos.sub(p5.Vector.sub(p.pos, p.prevPos).mult(1));
        p.pos.add(bound.mult(1).mult(pow(1, deltaTime)));
        continue;
      }
      p.prevPos = posBefore;
    }
  }
  if (renderSwitch == 1 || !run) {
    for (var s of sticks) {
      s.render();
    }
    for (var p of points) {
      p.render();
    }
  }
  if (run && renderSwitch == 2) {
    push();
    noFill();
    var val = points.length % 4 == 0 && !final ? QUADS : LINES;
    var val2 = final ? 40 : 20;
    strokeWeight(val2);
    stroke(255);
    beginShape(val);
    for (let i = 0; i < points.length; i++) {
      stroke(points[i].pos.x, points[i].pos.y, i * 10);
      vertex(points[i].pos.x, points[i].pos.y);
    }
    endShape();
    pop();
  } else if (run && renderSwitch == 3) {
    push();
    noFill();
    stroke(255);
    beginShape();
    for (let i = 0; i < points.length; i++) {
      vertex(points[i].pos.x, points[i].pos.y);
    }
    endShape();
    pop();
  }
}