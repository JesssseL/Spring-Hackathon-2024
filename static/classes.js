/*
 *  Class definitions
 */

//Buildings
class Building {
  constructor(code, x, y, size, budget, sustain) {
    this.code = code;
    this.x = x;
    this.y = y;
    this.size = size;
    this.budget = budget;
    this.balls = [];
    this.sustainability = sustain;

    let thickness = 5;

    let drawX = this.x - (windowWidth / 2);
    let drawY = this.y - (windowHeight / 2);
    
    // Create bottom rectangle
    //let bottomRectangle = Matter.Bodies.rectangle(drawX, drawY + size / 2, size, thickness, { isStatic: true });

    // Create lines for the open sides
    //let leftSide = Matter.Bodies.rectangle(drawX - size / 2 + thickness / 2, drawY, thickness, size - thickness, { isStatic: true });
    //let rightSide = Matter.Bodies.rectangle(drawX + size / 2 - thickness / 2, drawY, thickness, size - thickness, { isStatic: true });
    //let topSide = Matter.Bodies.rectangle(drawX, drawY - size / 2 + thickness / 2, size - thickness * 2, thickness, { isStatic: true });

    // Combine all bodies into a single composite
    //this.body = Matter.Body.create({
    //  parts: [bottomRectangle, leftSide, rightSide]
    //});

    this.body = Matter.Bodies.rectangle(drawX, drawY + size / 2, size, thickness, { isStatic: true })

    
    //Matter.Body.setPosition(this.body, { x: drawX, y: drawY });
    
    //this.body = Matter.Bodies.rectangle(x, y, size, size, {isStatic: true});
    Matter.World.add(world, this.body);
  }
  //Returning private variables
  getCode() { return this.code; }
  getX() { return this.x; }
  getY() { return this.y; }
  getBudget() { return this.budget; }
  getSize() { return this.size; }
  //Methods
  // draw() { return square(this.x, this.y, this.size); }
  draw() { 
      let model;
      switch (this.code) {
          case "F":
              model = fusion3D
              break;
          case "PG":
            model = pgb3D
            break;
          case "D":
            model = dorsetHouse3D
            break;
          case "K":
            model = kimmeridge3D
            break;
      }
      return image(model, this.x, this.y, this.size, this.size)
  }
  getBalls() { return this.balls; }
  addBall(ball) { this.balls.push(ball) }
  removeBall(ball) { this.balls.splice(this.balls.indexOf(ball), 1); }
  update() {
    //this.x = this.body.position.x;
    //this.y = this.body.position.y;
    // Adjust position to account for top-left origin
    this.draw();
  }
}

//Ball
class Ball {
  constructor(type, building, size, sus_value, x, y) {
    this.x = x;
    this.y = y;
    this.default_x = x;
    this.default_y = y;
    this.type = type;
    this.sus_value = sus_value;
    this.building = building;
    this.size = size;
    this.dragging = false;
    this.body = Matter.Bodies.circle(this.x, this.y, this.size / 2);
    Matter.World.add(world, this.body);
  }
  //returning private variables
  getX() { return this.x; }
  getY() { return this.y; }
  getDefaultX() { return this.default_x; }
  getDefaultY() { return this.default_y; }
  setX(x) { this.x = x; }
  setY(y) { this.y = y; }
  getType() { return this.type; }
  getSize() { return this.size; }
  getSusValue() { return this.sus_value; }
  getBuilding() { return this.building; }
  hasBuilding() { return this.building != null; }
  //Methods
  setBuilding(building) { this.building = building; /*console.log("building updated to " + building);*/ }
  resetPosition() {
      this.building = null;
      this.x = this.default_x;
      this.body.position.x = this.default_x;
      this.y = this.default_y;
      this.body.position.y = this.default_y;
  }
  draw(x, y) {     
    this.x = x;
    this.y = y;
    if (this.type == 'solar') {
      // blue
      fill(0,0,255);
    } else if (this.type == 'electric') {
      // yellow
      fill(255,255,0);
    } else if (this.type == 'gas') {
      // purple
      fill(255,0,255);
    }
    return ellipse(x, y, this.size, this.size); 
  }
  update() {
    this.x = this.body.position.x;
    this.y = this.body.position.y;

    /*if (this.building != null && !this.dragging) {
      if (this.y < this.building.getY() + this.building.getSize()) {
        console.log("below y")
        this.y = this.building.getY() + this.building.getSize() - this.size / 2;
      }
    }*/

    /*if (!this.dragging) {
        // Apply gravity
        Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: 0.001 });

        // Check if the ball is below the desired position
        if (this.building != null && this.body.position.y > this.building.getY() + this.building.getSize() - this.size / 2) {
            // Stop the ball's velocity
            Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
            // Move the ball to the desired position
            Matter.Body.setPosition(this.body, { x: this.body.position.x, y: this.building.getY() + this.building.getSize() - this.size / 2 });
        }
    }*/

    if (!this.dragging) {
        // Apply gravity
        Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: 0.01 });

        // Check if the ball is below the desired position
        if (this.building != null && this.body.position.y >= this.building.getY() + this.building.getSize() - this.size / 2) {
            // Stop the ball's vertical movement
            Matter.Body.setVelocity(this.body, { x: this.body.velocity.x, y: 0 });
            // Move the ball to the desired vertical position
            Matter.Body.setPosition(this.body, { x: this.body.position.x, y: this.building.getY() + this.building.getSize() - this.size / 2 });

          this.body.force.y = 0;
          //Matter.Body.setStatic(this.body, true);
        }

      if (this.building != null) {
        let leftBoundary = this.building.getX() + this.size / 2;
        if (this.body.position.x < leftBoundary) {
            Matter.Body.setPosition(this.body, { x: leftBoundary, y: this.body.position.y });
        }
        let rightBoundary =leftBoundary + this.building.getSize() - this.size;
        if (this.body.position.x > rightBoundary) {
            Matter.Body.setPosition(this.body, { x: rightBoundary, y: this.body.position.y });
        }
      }
      
    }
    
    //if (this.gravity) {
      /*if (this.y < (windowHeight*0.9) - (this.size / 2) - 5) {
        this.y+=5;
      }*/
    //Matter.Body.setPosition(this.body, { x: this.x, y: this.y });
    
    this.draw(this.x, this.y);
    /*} else {
      //this.bounce(this.building)
    }*/
    
  }

  ballClicked() {
    let pos = this.body.position;
    let r = this.size / 2;
      // console.log(`${mouseX}, ${mouseY}, ${pos.x}, ${pos.y}`)
      // console.log(`Dist ${dist(mouseX, mouseY, pos.x, pos.y)} and 2r=${r*2}`)
    if (dist(mouseX, mouseY, pos.x, pos.y) < r) {
        // console.error("ball IS clicked")
      return true;
    } else {
      return false;
    }
  }
  
  mousePressed() {
    let pos = this.body.position;
    let r = this.size / 2;
    if (dist(mouseX, mouseY, pos.x, pos.y) < r) {
      // If mouse is over the ball, start dragging
      // console.log("clicked a ball");
      this.dragging = true;
      // Set Matter.js body as non-static so it can move
      Matter.Body.setStatic(this.body, true);
    }
  }

  mouseDragged() {
    if (this.dragging) {
      // console.log("dragged a ball")
      // If the ball is being dragged, update its position
      Matter.Body.setPosition(this.body, { x: mouseX, y: mouseY });
    }
  }

  mouseReleased() {
      // console.log("mouse released")
    if (this.dragging) {
      // console.log("released a ball")
      if (TUTORIAL_STEP == 1){
        console.log('have ball')
        TUTORIAL_STEP=2
        easyfix = true
      }
      // If the ball was being dragged, release it
      // Reset the dragging flag
      this.dragging = false;
      // Set Matter.js body as static again so it stops moving
      Matter.Body.setStatic(this.body, false);
    }
  }
  bounce(building){
      console.log("BOUNCED")
    //Bounce the ball off the building when the building is at capacity
    if (this.y >= building.getY()-20) {
      //ball not yet at top of building
      this.draw(this.x, this.y);
      this.y += -(building.getSize()/10);

      //what side of the building is it on --> slide to closest exit
      if (mouseX >= building.getX()+building.getSize()/2) {
        //⏩⏩ ball is on the right side of the building
        this.x += ((building.getX()+building.getSize()+5)-this.x)/5
      } else {
        //⏪⏪ ball on left side of building
        this.x += -(this.x-(building.getX()-5)/3)
      }
      //flash screen red
      background(255,0,0,80)
    } else {
      console.log('out of box')
      this.gravity = true
    }
  }
}

//---- Dan Switch Classes ----
class Stick{
  constructor(a,b){
    this.pointA = a;
    this.pointB = b;
    this.length = dist(this.pointA.pos.x,this.pointA.pos.y,this.pointB.pos.x,this.pointB.pos.y);
    this.off = 0;
  }
  //function setLineDash(list) {
  //  drawingContext.setLineDash(list);
  //}
  render(){
    push();
    stroke(0);
    strokeWeight(4);
   // setLineDash([5, 5]);

    line(this.pointA.pos.x,this.pointA.pos.y,this.pointB.pos.x+this.off,this.pointB.pos.y+this.off);
    pop();
  }
}

class Point{
  constructor(x,y,locked=false){
    this.pos = createVector(x,y);
    this.prevPos = createVector(x,y);
    this.locked = locked;
  }

  render(){
    push()
    noStroke();
    fill(130);
    if(this.locked) fill("#ff5f5c");
    circle(this.pos.x,this.pos.y,15)
    pop()
  }
}

//Sorry Andrew <3
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
//More Swtich Stuff

function checkArea(x, y) {
  //dont make fun
  var i = 0;
  for (var p of points) {
    if (dist(p.pos.x, p.pos.y, x, y) <= 20) {
      return [false, i];
    }
    i++;
  }
  return [true];
}

//for two points
function getDistance(a, b) {
  return dist(a.x, a.y, b.x, b.y);
}
