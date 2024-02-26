//Setting Building Details
const waterCost = 370;
const electricCost = 45;



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
  
  fusion.draw();
  pooleGateway.draw();
  dorsetHouse.draw();
  kimmeridge.draw();
    
}

function mouseClicked() {
  //Check if mouse is over a building
  if (mouseX > fusion.getX() && mouseX < fusion.getX() + fusion.getSize() && mouseY > fusion.getY() && mouseY < fusion.getY() + fusion.getSize()) {
    console.log("Fusion")
  }
}

function addBall(building) {
  //Adds a ball to the building
  if (building.getBudget() < building.getBalls().length) {
    // enough capacity
    let ball = new Ball('', building);
  } else {
    // not enough capacity
    let ball = new Ball('', null);
  }
}