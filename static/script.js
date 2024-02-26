//Setting Building Details
const waterCost = 370; // type = 'W'
const electricCost = 45; // type = 'E'
const gasCost = 10.7; // type = 'G'

function setup() {
  createCanvas(windowWidth-10, windowHeight*0.9);

}

//Makings Buildings
let fusion = new Building('F', 20, 100, 1000);
let pooleGateway = new Building('PG', fusion.getX() + fusion.getSize() + 20, 100, 1000);
let dorsetHouse = new Building('D', pooleGateway.getX() + pooleGateway.getSize() + 20, 100, 1000);
let kimmeridge = new Building('K', dorsetHouse.getX() + dorsetHouse.getSize() + 20, 100, 1000);

function draw() {
  background(220);

  //Drawing Buildings
  fill(255,255,255);
  
  fusion.draw();
  pooleGateway.draw();
  dorsetHouse.draw();
  kimmeridge.draw();

  addBall('W', fusion);
}

function mouseClicked() {
  //Check if mouse is over a building
  if (mouseX > fusion.getX() && mouseX < fusion.getX() + fusion.getSize() && mouseY > fusion.getY() && mouseY < fusion.getY() + fusion.getSize()) {
    //Fusion
    console.log("Fusion")
  } else if (mouseX > pooleGateway.getX() && mouseX < pooleGateway.getX() + pooleGateway.getSize() && mouseY > pooleGateway.getY() && mouseY < pooleGateway.getY() + pooleGateway.getSize()) {
    //Poole Gateway
    console.log("PooleGateway")
  } else if (mouseX > kimmeridge.getX() && mouseX < kimmeridge.getX() + kimmeridge.getSize() && mouseY > kimmeridge .getY() && mouseY < kimmeridge.getY() + kimmeridge.getSize()) {
    //Kimmeridge
    console.log("Kimmeridge")
  } else if (mouseX > dorsetHouse.getX() && mouseX < dorsetHouse.getX() + dorsetHouse.getSize() && mouseY > dorsetHouse.getY() && mouseY < dorsetHouse.getY() + dorsetHouse.getSize()) {
    //Dorset House
    console.log("DorsetHouse")
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

