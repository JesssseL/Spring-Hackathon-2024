//Setting Building Details
const waterCost = 370; // type = 'W'
const electricCost = 45; // type = 'E'
const gasCost = 10.7; // type = 'G'
let windowW = window.innerWidth;

function setup() {
  createCanvas(windowWidth-10, windowHeight*0.9);
}

//Makings Building
const GAP = 20;
let fusion = new Building('F', GAP, 100, (windowW/100)*10, 1000);
let pooleGateway = new Building('PG', fusion.getX() + fusion.getSize() + GAP, 100, (windowW/100)*30, 1000);
let dorsetHouse = new Building('D', pooleGateway.getX() + pooleGateway.getSize() + GAP, 100, (windowW/100)*15, 1000);
let kimmeridge = new Building('K', dorsetHouse.getX() + dorsetHouse.getSize() + GAP, 100, (windowW/100)*20, 1000);


function draw() {
  background(220);

  //Drawing Buildings
  fill(255,255,255);
  
  fusion.draw();
  pooleGateway.draw();
  dorsetHouse.draw();
  kimmeridge.draw();

  addBall('G', fusion);
}

function mouseClicked() {
  //Check if mouse is over a building and react appropriatly ***COUGH COUGH ANDREW*** ahew sorry, what was that?
  if (checkBuilding(fusion)) {
    //Fusion
    console.log("Fusion")
  } else if (checkBuilding(pooleGateway)) {
    //Fusion
    console.log("Poole Gateway")
  } else if (checkBuilding(dorsetHouse)) {
    //Fusion
    console.log("Dorset House")
  } else if (checkBuilding(kimmeridge)) {
    //Fusion
    console.log("Kimmeridge")
  }
}

function checkBuilding(building) {
  //Checks if mouse is over a building
  if (mouseX > building.getX() && mouseX < building.getX() + building.getSize() && mouseY > building.getY() && mouseY < building.getY() + building.getSize()) {
    return true
  } else {
    return false
  }
}

function addBall(type, building) {
  //Adds a ball to the building
  if (building.getBudget() > building.getBalls().length) {
    // enough capacity
    let ball = new Ball(type, building);
    building.addBall(ball);

    let physics = new PhysicsEngine(building, ball);

    physics.update();
    
  } else {
    // not enough capacity
    let ball = new Ball(type, null);
  }
}

