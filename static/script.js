//Setting Building Details
const waterCost = 370;
const electricCost = 45;

const ballSize = 10;

//Buildings
class Building(code, x, y, budget) {
  constructor(code, x, y, budget) {
    this.code = code;
    this.x = x;
    this.y = y;
    this.budget = budget;
  }
}

let fusion = new Building('F', 20, 20, 1000);
let pooleGateway = new Building('PG', 140, 20, 1000);
let dorsetHouse = new Building('D', 260, 20, 1000);
let kimmeridge = new Building('K', 380, 20, 1000);

function setup() {
  createCanvas(windowWidth-10, windowHeight*0.9);
}

function draw() {
  background(220);

  //Drawing Buildings
  fill(255,255,255);
  //How to For Andrew - > X -co ord, Y co- ord, Size
  square(fusion.x, fusion.y, 100);
  square(pooleGateway.x, pooleGateway.y, 100);
  square(dorsetHouse.x, dorsetHouse.y, 100);
  square(kimmeridge.x, kimmeridge.y, 100);
  //function fillBuilding(20, 20, 'F')

  
}

function fillBuilding(params) {
  
}

function addBall(building) {
  //Adds a ball to the building
  
}