//Setting Building Details
const waterCost = 370; // type = 'W'
const electricCost = 45; // type = 'E'
const gasCost = 10.7; // type = 'G'
let windowW = window.innerWidth;
const LEVEL_TIME = 2000;
let currentTime = 0
const boxHeight = 200;
let sayNo;

//Colour
let Zomp = '#0DA486';
let RobinEggBlue = '#33C7BC';
let YellowGreen = '#8ACC3D';
let TeaGreen = '#D0E89E';
let HoneyDew = '#F0FFF3';

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

  //Buildings
  fusion = new Building('F', GAP, boxHeight, (windowW/100)*10, 1000);
  pooleGateway = new Building('PG', fusion.getX() + fusion.getSize() + GAP, boxHeight, (windowW/100)*25, 1000);
  dorsetHouse = new Building('D', pooleGateway.getX() + pooleGateway.getSize() + GAP, boxHeight, (windowW/100)*15, 1000);
  kimmeridge = new Building('K', dorsetHouse.getX() + dorsetHouse.getSize() + GAP, boxHeight, (windowW/100)*20, 1000);

  //⚽✨🏀✨⚾✨🏈 ADD BALLS HERE 🏉✨🏐✨⚾✨🥎  
  for (b=0; b<=10; b++) { 
    addBall('G', fusion); //gas
  }
  for (b=0; b<=10; b++) {
    addBall('W', fusion); //water
  }
  for (b=0; b<=10; b++) {
    addBall('E', fusion); //electric
  }

  //Reset Button
  let button;  
  button = createButton('Try Again?');
  button.position(5, 65);
  button.mousePressed(resetTime);
}
function resetTime() {
  //set current time to 0
  if (currentTime > 120) {
    currentTime = 0
    sayNo = 0
  } else {
    sayNo = 50
    console.log ('Are you even gonna try?')
    
    //window.alert('Are you even gonna try?')
  } 
}
function buttonReact() {
  if(sayNo >= 1){
    //if on
    textSize(200);
    let newColor = color(Zomp); //staring Color
    newColor.setAlpha(sayNo); 
    fill(newColor)
    text("NO", 0, 25, windowW);
    sayNo--
  }
}

function draw() {
  //Change Speed Here
  frameRate(60);
  background(HoneyDew);

  buttonReact()

  //------UI Elements------
  //🕖 Time Bar 🕖
  fill(Zomp);
  rect(0,0,windowW,25);
  fill(RobinEggBlue);
  rect(0,0,(windowW/LEVEL_TIME)*currentTime,25);
  currentTime++

  //🏆Win/ 💥Loss
    if (currentTime >= LEVEL_TIME-10) {
      fill(255,0,0);
      textSize(50);
      text('💥', windowWidth/2, windowHeight/2);
      //Dan attemting to code here
    } else {
      
    //🏢 Drawing Buildings 🏢
    fill(RobinEggBlue);
    fusion.update();
    pooleGateway.update();
    dorsetHouse.update();
    kimmeridge.update();

    let bounds = Matter.Bodies.rectangle(
      windowWidth / 2,
      windowHeight + (windowHeight / 2) - 75, // Adjust the position to be slightly below the area where balls are rendered
      windowWidth * 0.9,
      windowHeight,
      {
        isStatic: true,
        render: {
          fillStyle: 'transparent', // Make the bounding box transparent
          strokeStyle: 'none' // Disable stroke for the bounding box
        }
      }
    );
    Matter.World.add(world, bounds);
    
    for (var ball of fusion.getBalls()) {
      ball.update();
    }


    //ground = Matter.Bodies.rectangle(windowWidth/2, windowHeight-10, windowWidth, 20, {isStatic: true})
    //Matter.World.add(world, ground);
    }
}

function mousePressed() {
  for (var ball of fusion.getBalls()) {
    ball.mousePressed();
  }
}

function mouseDragged() {
  for (var ball of fusion.getBalls()) {
    ball.mouseDragged();
  }
}

function mouseReleased() {
  for (var ball of fusion.getBalls()) {
    ball.mouseReleased();
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

//Sustainability Scores
function checkSustainability() {
    //Check if the buildings are sustainable
    let xhr = new XMLHttpRequest()
    xhr.open('GET', '/sustainability', false)
    xhr.send()
    if (xhr.status === 200) {
        let res = JSON.parse(xhr.responseText)
        return res
    } else {
        alert("an error occured looking at sustainabilty")
    }
}