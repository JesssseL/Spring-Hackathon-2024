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
}

//Ball
class Ball {
  constructor(type, building) {
    this.type = type;
    this.size = 10;
    this.building = building;
    building.getBalls().push(this);
  }
  getType() { return this.type; }
  getSize() { return this.size; }
  getBuilding() { return this.building; }
  draw(x, y) { return ellipse(x, y, this.size, this.size); }
  kill() { /* Remove from building */ }
}