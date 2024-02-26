/*
 *  Class definitions
 */

//Buildings
class Building {
  constructor(code, x, y, budget) {
    this.code = code;
    this.x = x;
    this.y = y;
    this.size = 100;
    this.budget = budget;
    this.balls = [];
  }
  getCode() { return this.code; }
  getX() { return this.x; }
  getY() { return this.y; }
  getBudget() { return this.budget; }
  getSize() { return this.size; }
  draw() { return square(this.x, this.y, this.size); }
  getBalls() { return this.balls; }
  addBall(ball) { this.balls.push(ball); }
}

//Ball
class Ball {
  size = 10;
  constructor(type, building) {
    this.type = type;
    this.building = building;
  }
  getType() { return this.type; }
  getSize() { return this.size; }
  getBuilding() { return this.building; }
  draw(x, y) { 
    if (this.type == 'W') {
      // blue
      background(0,0,255);
    } else if (this.type == 'E') {
      // yellow
      background(255,255,0);
    } else if (this.type == 'G') {
      // purple
      background(255,0,255);
    }
    return ellipse(x, y, size, size); 
  }
}