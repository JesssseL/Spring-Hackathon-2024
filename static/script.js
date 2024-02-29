// Jess little guy counter
let jessLittleGuyCounter = 5;

//Setting Building Details
const waterCost = 370; // type = 'W'
const electricCost = 45; // type = 'E'
const gasCost = 10.7; // type = 'G'
let levelButton;
let windowW = window.innerWidth;
let windowH = (window.innerHeight)*0.9
const LEVEL_TIME = 2000;
let currentTime = 0
const boxHeight = 200;
let sayNo;
let graphCoOrds = [0, 0, 0, 0];
let levelInfo = 'Level 1 - a normal year at BU';
// Constants
const FUSION_SIZE = 15;
const POOLE_SIZE = 10;
const DORSET_SIZE = 5;
const KIMME_SIZE = 10;
graphCoOrds[10] = FUSION_SIZE
graphCoOrds[11] = POOLE_SIZE
graphCoOrds[12] = DORSET_SIZE
graphCoOrds[13] = KIMME_SIZE
graphCoOrds[20] = 'F'
graphCoOrds[21] = 'PG'
graphCoOrds[22] = 'D'
graphCoOrds[23] = 'K'

let DEVMODE = false; // true = test balls, false = normal balls

//Colour
let Zomp = '#0DA486';
let RobinEggBlue = '#33C7BC';
let YellowGreen = '#8ACC3D';
let TeaGreen = '#D0E89E';
let HoneyDew = '#F0FFF3';
function darkmode() {
  if (Zomp == '#0DA486'){
    Zomp = '#274E46';
    RobinEggBlue = '#3F6563';
    YellowGreen = '#5B6B40';
    TeaGreen = '#8F9F5D';
    HoneyDew = '#81C58D';
  } else {
    //now jess will stop having a bit of a panic :,)
    Zomp = '#0DA486';
    RobinEggBlue = '#33C7BC';
    YellowGreen = '#8ACC3D';
    TeaGreen = '#D0E89E';
    HoneyDew = '#F0FFF3';
  }
}

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

// All balls
let allBalls = [];

//Makings Building
const START = 75;
const GAP = 20;
const MAX = ((windowW/100));
function setup() {
  //p5.js
  createCanvas(windowWidth-25, windowHeight*0.9);
  
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

    let sustainabilityData = getData("/sustainability")
    let projects = getProjects();
    
  //Buildings
  const GAP = (windowW-100)/ ((FUSION_SIZE+POOLE_SIZE+DORSET_SIZE+KIMME_SIZE) * 1.15); // 4 buildings, 5 gaps
  let currentX = GAP + 50; // Start with a gap

  // Buildings - Adjusted for simplicity
  fusion = new Building('F', currentX, boxHeight, GAP*FUSION_SIZE, budgetData["fusion"], sustainabilityData["fusion"]);
  graphCoOrds[0] = currentX
  currentX += fusion.getSize() + GAP;
  
  pooleGateway = new Building('PG', currentX, boxHeight, GAP*POOLE_SIZE, budgetData["pgb"], sustainabilityData["pgb"]);
  graphCoOrds[1] = currentX
  currentX += pooleGateway.getSize() + GAP;

  dorsetHouse = new Building('D', currentX, boxHeight, GAP*DORSET_SIZE, budgetData["dorset_house"], sustainabilityData["dorset_house"]);
  graphCoOrds[2] = currentX
  currentX += dorsetHouse.getSize() + GAP;

  kimmeridge = new Building('K', currentX, boxHeight, GAP*KIMME_SIZE, budgetData["kimmeridge"], sustainabilityData["kimmeridge"]);
  graphCoOrds[3] = currentX

  // There you go, babe!
  // Sweet and simple, love.

  //⚽✨🏀✨⚾✨🏈 ADD BALLS HERE 🏉✨🏐✨⚾✨🥎

  if (DEVMODE) {
    for (b=0; b<=10; b++) {
      addBall('gas', null, 10 + (Math.random() * 10)); //gas
    }
    for (b=0; b<=10; b++) {
      addBall('water', null, 10 + (Math.random() * 10)); //water
    }
    for (b=0; b<=10; b++) {
      addBall('electric', null, 10 + (Math.random() * 10)); //electric
    }
  } else {
    for (let project of projects) {
        // console.log(project)
      let size = Math.floor(project["cost"]/( (project["cost"] > 8500) ? 1000 : 10000)) // 1000, 10000
      console.log(size);
      if (size < 30) {
        size = 40;
      } else if (size > 150) {
        size = 150;
      }
      // let size = Math.log2(project["cost"])*2
      // console.log(size)
      addBall(project["category"], null, size)
    }
  }

  //Next Level
  levelButton = createButton('Next Level');
  levelButton.position(windowW*0.45, windowH*0.6);
  levelButton.mousePressed(resetLevel);
  levelButton.hide()

  //Reset Button
  let button;  
  button = createButton('Try Again?');
  button.position(75, 45);
  button.mousePressed(resetTime);
}
function resetLevel() {
  levelInfo = '🛰️Level 2🚀 - 🛸IN THE FUTURE🛸';
  Zomp = '#960A23';
  RobinEggBlue = '#BB2930';
  YellowGreen = '#8127D5';
  TeaGreen = '#AC85EB';
  HoneyDew = '#fdd9f3';
  resetTime()
}
function resetTime() {

  // balls

  for (let ball of allBalls) {
    ball.setX(Math.random()*(upperWidth-lowerWidth)+lowerWidth);
    ball.setY(windowHeight * 0.7);
  }
  
  levelButton.hide()
  //set current time to 0
  if (currentTime > 120) {
    currentTime = 0
    sayNo = 0
    TUTORIAL_STEP = 6
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
    text("NO", 0, (windowH/2)-100, windowW);
    sayNo--
  }
}

var el = document.getElementById("pull-chain");

el.addEventListener("click", function() {
  el.classList.toggle("pulled");
  darkmode()
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

  //translate(windowWidth/2, windowHeight/2);

  //------UI Elements------
  //Title Text + Box
  strokeWeight(0)
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
  text(levelInfo, 0, 75, windowW);
  strokeWeight(0.5)
  
  //UI Use Box
  fill(HoneyDew);
  rect(25,133,windowW-75,windowHeight-325);

  //🕖 Time Bar 🕖
  fill('white');
  rect(50,120,windowW-125,25, 25);
  fill(YellowGreen);
  rect(50,120,(((windowW-125)/LEVEL_TIME)*currentTime),25, 25);
  currentTime++

  //🏆Win/ 💥Loss
  if (currentTime >= LEVEL_TIME-(LEVEL_TIME/4)){
    TUTORIAL_STEP = 15
  }
    if (currentTime >= LEVEL_TIME) {
      currentTime--
      fill(255,0,0);
      textSize(50);
      //Calculate sustainability
      //💐🌸💮🪷🏵️🌹🥀🌺🌻🌼🌱🪴🌲🌳
      let sus = 0;
      for (b=0; b<=3; b++){
        //graphCoOrds
          curr_sus_level = checkSustainability(graphCoOrds[b+20]);
          sus += curr_sus_level;
      }
      sus = sus/4
      //☘️🍀🍁🍂🍃🍄🪨🪵🌴🌵🌾🌿🌷🪻
      //Win/Loss Sequences
      if (sus >= 60) {
        //Win Sequence here
        text('🎉', windowWidth/2, windowHeight/2);
        levelButton.show()
      } else {
        //Loss Sequence here
        text('💥', windowWidth/2, windowHeight/2);
      }
      
      TUTORIAL_STEP = 6
    } else {
      
    //🏢 Drawing Buildings 🏢
    fill(RobinEggBlue);
    fusion.update();
    pooleGateway.update();
    dorsetHouse.update();
    kimmeridge.update();

    //📊 Drawing Graphs 📊
    for (b=0; b<=3; b++){
      //graphCoOrds
      fill(TeaGreen);
      rect(graphCoOrds[b] + GAP, boxHeight + GAP, GAP, (GAP*graphCoOrds[b+10])-(GAP*3));
      fill('white');
      rect(graphCoOrds[b] + GAP, boxHeight + GAP, GAP, ((GAP*graphCoOrds[b+10])-(GAP*3))*(1-(checkSustainability(graphCoOrds[b+20])/100)));
    }
    buttonReact()

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

    let thickness = 5;
      
      let leftWall = Matter.Bodies.rectangle(20, 0, 10, windowHeight * 2, { isStatic: true });
      let rightWall = Matter.Bodies.rectangle(windowWidth - 42, 0, 10, windowHeight * 2, { isStatic: true });

      Matter.World.add(world, leftWall);
      Matter.World.add(world, rightWall);
    
    for (var ball of allBalls) {
      ball.update();
      //if (ball.hasBuilding()) {
      if (checkBuildingAgainstBall(fusion, ball)) {
        ball.setBuilding(fusion);
      }
      if (checkBuildingAgainstBall(pooleGateway, ball)) {
        ball.setBuilding(pooleGateway);
      }
      if (checkBuildingAgainstBall(dorsetHouse, ball)) {
        ball.setBuilding(dorsetHouse);
      }
      if (checkBuildingAgainstBall(kimmeridge, ball)) {
        ball.setBuilding(kimmeridge);
      }
      //}
    }


    // ground = Matter.Bodies.rectangle(windowWidth/2, windowHeight-20, windowWidth, 20, {isStatic: true})
    // Matter.World.add(world, ground);
    }
  // Calculate the proportional height
  drawBB()
  tutorial()
}




function mouseClicked() {
  //Check if mouse is over a building and react appropriatly ***COUGH COUGH ANDREW*** ahew sorry, what was that?
  if (checkBuilding(fusion)) {
    //Fusion
    console.log("Fusion")
    for (var ball of allBalls) {
      // ball.mousePressed();
      if (ball.ballClicked()) {
        ball.setBuilding(fusion);
      }
    }
  } else if (checkBuilding(pooleGateway)) {
    //Poole Gateway
    console.log("Poole Gateway")
    for (var ball of allBalls) {
      // ball.mousePressed();
      if (ball.ballClicked()) {
        ball.setBuilding(pooleGateway);
      }
    }
  } else if (checkBuilding(dorsetHouse)) {
    //Dorset House
    console.log("Dorset House")
    for (var ball of allBalls) {
      // ball.mousePressed();
      if (ball.ballClicked()) {
        ball.setBuilding(dorsetHouse);
      }
    }
  } else if (checkBuilding(kimmeridge)) {
    //Kimmeridge
    console.log("Kimmeridge")
    for (var ball of allBalls) {
      // ball.mousePressed();
      if (ball.ballClicked()) {
        ball.setBuilding(kimmeridge);
      }
    }
  }
  //tutorial 
  if (TUTORIAL_STEP <=5) {
  if (TUTORIAL_STEP != 1 && TUTORIAL_STEP != 4){
    if (!easyfix) {
    TUTORIAL_STEP++
    }
  }
  }
}

function mousePressed() {
  for (var ball of allBalls) {
    if (ball.ballClicked()) {
      ball.mousePressed();
    }
  }
}

function mouseDragged() {
  for (var ball of allBalls) {
    ball.mouseDragged();
  }
}

function mouseReleased() {
  for (var ball of allBalls) {
    ball.mouseReleased();
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

function checkBuildingAgainstBall(building, ball) {
  //Checks if mouse is over a building
  if (ball.getX() > building.getX() && ball.getX() < building.getX() + building.getSize() && ball.getY() > building.getY() && ball.getY() < building.getY() + building.getSize()) {
    return true
  } else {
    return false
  }
}

function addBall(type, building, size) {

  let lowerWidth = pooleGateway.getX() + 100;
  let upperWidth = dorsetHouse.getX() + dorsetHouse.getSize() - 100;
  
  if (building != null) { 
      alert("building is not null"); 
  //Adds a ball to the building
    if (building.getBudget()["total"] > building.getBalls().length) {
      // enough capacity
      //🛸TYPE, BUILDING, GRAVITY(TRUE???)🛸
      let ball = new Ball(type, building, size, Math.random()*(upperWidth-lowerWidth)+lowerWidth, windowHeight * 0.7);

      building.addBall(ball);
      allBalls.push(ball);
    
    } else {
      // not enough capacity
      //🛸TYPE, BUILDING, GRAVITY(FALSE??)🛸
      let ball = new Ball(type, null, size, Math.random()*(upperWidth-lowerWidth)+lowerWidth, windowHeight * 0.7);
      allBalls.push(ball);
    }
  } else {
    let ball = new Ball(type, null, size, Math.random()*(upperWidth-lowerWidth)+lowerWidth, windowHeight * 0.7);
    allBalls.push(ball);
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
        alert(`An error occured while trying to look at: ${url}. Please reload the page. If it still broke then tell james he did a silly`)
    }
}

let default_sustainability;
let sus_level = {"F": 0, "PG": 0, "D": 0, "K": 0};


//Sustainability Scores
function checkSustainability(roomCode) {
    // console.log(roomCode)
    if (default_sustainability == null) { default_sustainability = getData("/sustainability") }
    sus_level = {"F": default_sustainability["F"], "PG": default_sustainability["PG"], "D": default_sustainability["D"], "K": default_sustainability["K"]};
    // console.log(default_vals)
    for (let current_ball of allBalls) {
        let current_building = current_ball.getBuilding()
        // console.log(current_building)
        if (current_building != null) {
            // console.log(default_sustainability[current_building.code])
            sus_level[current_building.code] += 10
        } 
    }
    // return getData('/sustainability')
    return sus_level[roomCode];
}

function checkBudgets() {
    return getData('/budgets')
}

function getProjects() {
    return getData('/projects')
}

function FREEZE() {
    for (let current_ball of allBalls) {
        Matter.body.setStatic(current_ball.body, true)
    }
}

function seeBallsHomes() {
    for (let current_ball of allBalls) {
        console.log(current_ball.getBuilding())
    }
}