//Setting Building Details
const waterCost = 370; // type = 'W'
const electricCost = 45; // type = 'E'
const gasCost = 10.7; // type = 'G'
let windowW = window.innerWidth;
const LEVEL_TIME = 10000;
let currentTime = 0
const boxHeight = 200;

// Matter.js
let engine;
let world;
let ground;

// Buildings
let fusion;
let pooleGateway;
let dorsetHouse;
let kimmeridge;

//Makings Building
const GAP = 20;
function setup() {
  //p5.js
  createCanvas(windowWidth-10, windowHeight*0.9);
  //Matter.js
  engine = Matter.Engine.create();
  world = engine.world;
  Matter.Runner.run(engine);
  ground = Matter.Bodies.rectangle(windowWidth/2, windowHeight-10, windowWidth, 20, {isStatic: true})
  Matter.World.add(world, ground);

  //Buildings
  fusion = new Building('F', GAP, boxHeight, (windowW/100)*10, 1000);
  pooleGateway = new Building('PG', fusion.getX() + fusion.getSize() + GAP, boxHeight, (windowW/100)*30, 1000);
  dorsetHouse = new Building('D', pooleGateway.getX() + pooleGateway.getSize() + GAP, boxHeight, (windowW/100)*15, 1000);
  kimmeridge = new Building('K', dorsetHouse.getX() + dorsetHouse.getSize() + GAP, boxHeight, (windowW/100)*20, 1000);
  addBall('G', fusion);
}

function draw() {
  //Change Speed Here
  frameRate(60);
  background(220);

  //------UI Elements------
  //🕖 Time Bar 🕖
  fill(0,0,100);
  rect(0,0,windowWidth,25);
  fill(0,255,255);
  rect(0,0,(windowWidth/LEVEL_TIME)*currentTime,25);
  currentTime++

  //🏆Win/ 💥Loss
  if (currentTime >= LEVEL_TIME) {
    fill(255,0,0);
    textSize(50);
    text('💥', windowWidth/2, windowHeight/2);
    noLoop();
  } else {
  //Drawing Buildings
  fill(255,255,255);
  fusion.draw();
  pooleGateway.draw();
  dorsetHouse.draw();
  kimmeridge.draw();
  
  //Drawing My ✨perfect little pretend✨ Ball testBall();
  
    for (var ball of fusion.getBalls()) {
      ball.update();
    }
  }
}



function mouseClicked() {
  //Check if mouse is over a building and react appropriatly ***COUGH COUGH ANDREW*** ahew sorry, what was that?
  if (checkBuilding(fusion)) {
    //Fusion
    console.log("Fusion")
  } else if (checkBuilding(pooleGateway)) {
    //Poole Gateway
    console.log("Poole Gateway")
  } else if (checkBuilding(dorsetHouse)) {
    //Dorset House
    console.log("Dorset House")
  } else if (checkBuilding(kimmeridge)) {
    //Kimmeridge
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
    //🛸TYPE, BUILDING, GRAVITY(TRUE???)🛸
    let ball = new Ball(type, building);
    ball.setX(100);
    ball.setY(100);
    building.addBall(ball);
    
  } else {
    // not enough capacity
    //🛸TYPE, BUILDING, GRAVITY(FALSE??)🛸
    let ball = new Ball(type, null);
  }
}
