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
let render;
let world;
let ground;

// Buildings
let fusion;
let pooleGateway;
let dorsetHouse;
let kimmeridge;


//Makings Building
const GAP = 20;
const START = 100;
function setup() {
  //p5.js
  createCanvas(windowWidth-25, windowHeight*0.8);
  //Matter.js
  engine = Matter.Engine.create(); // HELLO ANDREW!!!
  world = engine.world; 
  render = Matter.Render.create({
      element: document.body,
      engine: engine,
      options: {
          width: windowWidth,
          height: windowHeight,
          wireframes: false, // Set to true for wireframe rendering if needed
          showAxes: true, // Show axes
          showAngleIndicator: true, // Show angle indicator
          showCollisions: true, // Show collision points
          showConvexHulls: true, // Show convex hulls of bodies
          showPositions: true, // Show positions of bodies
          showBounds: true, // Show bounding boxes of bodies
          showVelocity: true, // Show velocity of bodies
          showIds: true // Show IDs of bodies
      }
  });
  Matter.Runner.run(engine);
  Matter.Render.lookAt(render, {
    min: { x: 0, y: 0},
    max: { x: windowWidth, y: windowHeight }
  });

  // Get Budget & Sustainability Data
    let budgetData = checkBudgets();
    let sustainabilityData = checkSustainability();
    
  //Buildings
  fusion = new Building('F', GAP, boxHeight, (windowW/100)*10, budgetData["fusion"], sustainabilityData["fusion"]);
  pooleGateway = new Building('PG', fusion.getX() + fusion.getSize() + GAP, boxHeight, (windowW/100)*25, budgetData["pgb"], sustainabilityData["pgb"]);
  dorsetHouse = new Building('D', pooleGateway.getX() + pooleGateway.getSize() + GAP, boxHeight, (windowW/100)*15, budgetData["dorset_house"], sustainabilityData["dorset_house"]);
  kimmeridge = new Building('K', dorsetHouse.getX() + dorsetHouse.getSize() + GAP, boxHeight, (windowW/100)*20, budgetData["kimmeridge"], sustainabilityData["kimmeridge"]);

  //⚽✨🏀✨⚾✨🏈 ADD BALLS HERE 🏉✨🏐✨⚾✨🥎  
    console.log("new ballz")
  for (b=0; b<=100; b++) { 
    addBall('G', fusion); //gas
  }
  for (b=0; b<=100; b++) {
    addBall('W', fusion); //water
  }
  for (b=0; b<=100; b++) {
    addBall('E', fusion); //electric
  }
    console.log("ballz added")

  //Reset Button
  let button;  
  button = createButton('Try Again?');
  button.position(75, 45);
  button.mousePressed(resetTime);

  let nightModeButton;  
  nightModeButton= createButton('🌚?');
  nightModeButton.position(windowW-(75+nightModeButton.width), 45);
  nightModeButton.mousePressed(resetTime);
}
function resetTime() {
  //set current time to 0
  if (currentTime > 120) {
    currentTime = 0
    sayNo = 0
    
  } else {
    sayNo = 50
    console.log ('Are you even gonna try?')
    
  } 
}
function buttonReact() {
  if(sayNo >= 1){
    if(sayNo >= 45){
    background('#f4c0b4');
    }
    //if on
    textSize(200);
    let newColor = color(Zomp); //staring Color
    newColor.setAlpha(sayNo); 
    fill(newColor)
    text("NO", 0, 25, windowW);
    sayNo--
  }
}

var el = document.getElementById("pull-chain");

el.addEventListener("click", function() {
  el.classList.toggle("pulled");
  if (document.getElementById("dayNight").innerHTML == "Goodnight"){
    document.getElementById("dayNight").innerHTML = "Good Morning";
  } else {
    document.getElementById("dayNight").innerHTML = "Goodnight";
  }
}, false);

function draw() {
  //Change Speed Here
  frameRate(60);
  background(RobinEggBlue);

  buttonReact()

  //------UI Elements------
  //Title Text + Box
  fill('white');
  rect((windowW/2)-200,15,400,90);
  fill(Zomp);
  textAlign(CENTER)
  textSize(40);
  textStyle(BOLD);
  textFont("Comic Neue");
  text('Buckets and Balls', 0, 20, windowW);
  textSize(25);
  fill(TeaGreen);
  text('Level 1 - a normal year at BU', 0, 75, windowW);

  //UI Use Box
  fill(HoneyDew);
  rect(25,133,windowW-75,windowHeight-325);

  //🕖 Time Bar 🕖
  fill(TeaGreen);
  rect(50,120,windowW-125,25, 25);
  fill(Zomp);
  rect(50,120,(((windowW-125)/LEVEL_TIME)*currentTime),25, 25);
  currentTime++

  //🏆Win/ 💥Loss
    if (currentTime >= LEVEL_TIME-10) {
      fill(255,0,0);
      textSize(50);
      text('💥', windowWidth/2, windowHeight/2);
      //Loss Sequence here
    } else {
      
    //🏢 Drawing Buildings 🏢
    fill(RobinEggBlue);
    fusion.update();
    pooleGateway.update();
    dorsetHouse.update();
    kimmeridge.update();

    let bounds = Matter.Bodies.rectangle(
      windowWidth / 2,
      windowHeight * 0.9 + (windowHeight * 0.5) - 120, // Adjust the position to be slightly below the area where balls are rendered
      windowWidth + 75,
      windowHeight,
      {
        isStatic: true,
        render: {
          fillStyle: 'red', // Make the bounding box transparent
          strokeStyle: 'blue' // Disable stroke for the bounding box
        }
      }
    );
    Matter.World.add(world, bounds);
    
    for (var ball of fusion.getBalls()) {
      ball.update();
    }


    // ground = Matter.Bodies.rectangle(windowWidth/2, windowHeight-20, windowWidth, 20, {isStatic: true})
    // Matter.World.add(world, ground);
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
  if (building.getBudget()["total"] > building.getBalls().length) {
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

function getData(url) {
    //Skeleton get data
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, false) // Set the method & route for the request
    xhr.send() // Trigger the send request
    if (xhr.status === 200) {
        // If Successful
        let res = JSON.parse(xhr.responseText)
        return res
        // Returns JSON from the URL

    } else {
        // If anything but successful
        alert(`An error occured while trying to look at: ${url}. Pls tell james he done a silly`)
    }
}

//Sustainability Scores
function checkSustainability() {
    return getData('/sustainability')
}

function checkBudgets() {
    return getData('/budgets')
}

function getProjects() {
    return getData('/projects')
}