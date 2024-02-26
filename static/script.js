//Setting Building Details
const waterCost = 370; // type = 'W'
const electricCost = 45; // type = 'E'
const gasCost = 10.7; // type = 'G'

function setup() {
  createCanvas(windowWidth-10, windowHeight*0.9);

}

//Makings Buildings
let fusion = new Building('F', 20, 100, 1000);
let pooleGateway = new Building('PG', 140, 100, 1000);
let dorsetHouse = new Building('D', 260, 100, 1000);
let kimmeridge = new Building('K', 380, 100, 1000);

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
    //Fusion
    console.log("Fusion")
  } else if (mouseX > pooleGateway.getX() && mouseX < pooleGateway.getX() + pooleGateway.getSize() && mouseY > pooleGateway.getY() && mouseY < pooleGateway.getY() + pooleGateway.getSize()) {
    //Poole Gateway
    console.log("pooleGateway")
  } else if (mouseX > kimmeridge.getX() && mouseX < kimmeridge.getX() + kimmeridge.getSize() && mouseY > kimmeridge .getY() && mouseY < kimmeridge.getY() + kimmeridge.getSize()) {
    //Kimmeridge
    console.log("kimmeridge")
  } else if (mouseX > dorsetHouse.getX() && mouseX < dorsetHouse.getX() + dorsetHouse.getSize() && mouseY > dorsetHouse.getY() && mouseY < dorsetHouse.getY() + dorsetHouse.getSize()) {
    //Kimmeridge
    console.log("kimmeridge")
  }
}

function addBall(type, building) {
  //Adds a ball to the building
  if (building.getBudget() < building.getBalls().length) {
    // enough capacity
    let ball = new Ball(type, building);
    building.addBall(ball);
    ball.draw(100, 100);
  } else {
    // not enough capacity
    let ball = new Ball(type, null);
  }
}

addBall('W', fusion);