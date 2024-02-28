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
  draw() { return square(this.x, this.y, this.size); }
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
  constructor(type, building, size) {
    this.x = 300;
    this.y = 100;
    this.type = type;
    this.building = building;
    this.size = size;
    this.dragging = false;
    this.body = Matter.Bodies.circle(this.x, this.y, this.size / 2);
    Matter.World.add(world, this.body);
  }
  //returning private variables
  setX(x) { this.x = x; }
  setY(y) { this.y = y; }
  getType() { return this.type; }
  getSize() { return this.size; }
  getBuilding() { return this.building; }
  //Methods
  setBuilding(building) { 
    this.building = building; 
    console.log("building updated to " + building); 
  }
    draw(x, y) { 
    this.x = x;
    this.y = y;
    if (this.type == 'W') {
      // blue
      fill(0,0,255);
    } else if (this.type == 'E') {
      // yellow
      fill(255,255,0);
    } else if (this.type == 'G') {
      // purple
      fill(255,0,255);
    }
    return ellipse(x, y, this.size, this.size); 
  }
  update() {
    this.x = this.body.position.x;
    this.y = this.body.position.y;
    //if (this.gravity) {
      /*if (this.y < (windowHeight*0.9) - (this.size / 2) - 5) {
        this.y+=5;
      }*/
    Matter.Body.setPosition(this.body, { x: this.x, y: this.y });
    this.draw(this.x, this.y);
    /*} else {
      //this.bounce(this.building)
    }*/
    
  }

  ballClicked() {
    
    let pos = this.body.position;
    let r = this.size / 2;
    if (dist(mouseX, mouseY, pos.x, pos.y) < r) {
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
      console.log("clicked a ball");
      this.dragging = true;
      // Set Matter.js body as non-static so it can move
      Matter.Body.setStatic(this.body, true);
    }
  }

  mouseDragged() {
    if (this.dragging) {
      console.log("dragged a ball")
      // If the ball is being dragged, update its position
      Matter.Body.setPosition(this.body, { x: mouseX, y: mouseY });
    }
  }

  mouseReleased() {
    if (this.dragging) {
      console.log("released a ball")
      // If the ball was being dragged, release it
      // Set Matter.js body as static again so it stops moving
      Matter.Body.setStatic(this.body, false);
      // Reset the dragging flag
      this.dragging = false;
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