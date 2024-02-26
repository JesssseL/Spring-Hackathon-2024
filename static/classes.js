/*
 *  Class definitions
 */

//Buildings
class Building {
  constructor(code, x, y, size, budget) {
    this.code = code;
    this.x = x;
    this.y = y;
    this.size = size;
    this.budget = budget;
    this.balls = [];
  }
  getCode() { return this.code; }
  getX() { return this.x; }
  getY() { return this.y; }
  setX(x) { this.x = x; }
  setY(y) { this.y = y; }
  getBudget() { return this.budget; }
  getSize() { return this.size; }
  draw() { return square(this.x, this.y, this.size); }
  getBalls() { return this.balls; }
  addBall(ball) { this.balls.push(ball); }
}

//Ball
class Ball {
  constructor(type, building) {
    this.x = 0;
    this.y = 0;
    this.type = type;
    this.building = building;
    this.size = 20;
    this.gravity = true;
  }
  setX(x) { this.x = x; }
  setY(y) { this.y = y; }
  getType() { return this.type; }
  getSize() { return this.size; }
  getBuilding() { return this.building; }
  setGravity(gravity) { this.gravity = gravity; }
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
    if (this.gravity) {
      if (this.y < (windowHeight*0.9) - (this.size / 2) - 5) {
        this.y+=5;
      }
      this.draw(this.x, this.y);
    } else {
      this.bounce(this.building)
    }
    
  }
  bounce(building){
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