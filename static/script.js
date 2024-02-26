//Setting Building Details
const waterCost = 370;
const electricCost = 45;

const ballSize = 10;

//Buildings
//How to For Andrew -> RoomCode, x, y, budget
let fusion = ['F', 20, 20, 1000];

let pooleGateway = ['PG', 140, 20, 1000];
let dorsetHouse = ['D', 260, 20, 1000];
let kimmeridge = ['K', 380, 20, 1000];

class Building(code, x, y, budget) {
  constructor(code, x, y, budget) {
    this.code = code;
    this.x = x;
    this.y = y;
    this.budget = budget;
  }
}

let fusion = 

function setup() {
  createCanvas(windowWidth-10, windowHeight*0.9);
}

function draw() {
  background(220);

  //Drawing Buildings
  fill(255,255,255);
  //How to For Andrew - > X -co ord, Y co- ord, Size
  square(fusion[1], fusion[2], 100);
  square(pooleGateway[1], pooleGateway[2], 100);
  square(dorsetHouse[1], dorsetHouse[2], 100);
  square(kimmeridge[1], kimmeridge[2], 100);
  //function fillBuilding(20, 20, 'F')

  
}

function fillBuilding(params) {
  
}

function addBall(building) {
  //Adds a ball to the building
  
}