//Setting Building Details
const waterCost = 370; // type = 'W'
const electricCost = 45; // type = 'E'
const gasCost = 10.7; // type = 'G'
let windowW = window.innerWidth;

const boxHeight = 200;

function setup() {
  createCanvas(windowWidth-10, windowHeight*0.9);
}

//Makings Building
const GAP = 20;
let fusion = new Building('F', GAP, boxHeight, (windowW/100)*10, 1000);
let pooleGateway = new Building('PG', fusion.getX() + fusion.getSize() + GAP, boxHeight, (windowW/100)*30, 1000);
let dorsetHouse = new Building('D', pooleGateway.getX() + pooleGateway.getSize() + GAP, boxHeight, (windowW/100)*15, 1000);
let kimmeridge = new Building('K', dorsetHouse.getX() + dorsetHouse.getSize() + GAP, boxHeight, (windowW/100)*20, 1000);

let box = 0;
let forwards = true;
function draw() {
  background(220);
  //Drawing Buildings
  fill(255,255,255);
  
  fusion.draw();
  pooleGateway.draw();
  dorsetHouse.draw();
  kimmeridge.draw();

  fill(box*3.154159265,(box/255)*42,box*0.7-80);
  square(box, 20, 55);
  if (forwards){
    box++;
  } else {
    box--;
  }
  if (box == kimmeridge.getX() + kimmeridge.getSize()){
    forwards = false;
  }
  if (box == 0){
    forwards = true;
  }

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
    ball.setX(100);
    ball.setY(100);
    building.addBall(ball);
    
  } else {
    // not enough capacity
    let ball = new Ball(type, null);
  }
}

function ballBounce() {
  
}
