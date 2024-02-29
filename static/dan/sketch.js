/*
  Author: Noah Breedy
  Description: A cool way to simulate ropes and softbodies
  I made this project origionally for my create task in apcsp and I say it turned out 
  pretty good and I cannot complain
  Finished 2/5/2022 @ 3:43 a.m.
  
  Hit Q and W to switch draw mode 
  
  
  Drawing Lines: Simply click and drag between the points to draw a line
  Drawing Points: Click on a point to lock or unlock it
  
  Hit D key to delete all points 
  
  Hit space to run sim and hit E to change render mode
  
  While in run mode hit A or S key to spawn a rectancle or circle (respectivley)
  
  Clicking on the screen while in render mode will cause "wind" to affect the points
*/

let points = [];
let sticks = [];
let run = true;
let mode = 0;
let render = 1;
let gravity, wind, bound;
let selection = [false, null, null];
let slider;
let final = false;
let selectedPoint = null;

function setup() {
  //createCanvas(window.innerWidth, window.innerHeight - window.innerHeight / 4);
  createCanvas(200, 200)
  textSize(20);
  angleMode(DEGREES);
  //slider = createSlider(1, 3, 1.5, 0.5);
  gravity = createVector(0, 1);
  wind = createVector(1, 0);
  bound = createVector(1, 0);
  //genCircle(200,200,100,20);
  //genCircle(400,200,100,20);
  //genCloth(10,10);
  // var res = 50;
  // for(var i =0;i<(width/res);i++){
  //   genRect(i*res,0,res);
  // }
}

function draw() {
  background("#33C7BC");
  fill(255);
  if (!run) {
    if (mode == 1) {
      text("Drawing: Points", 0, 20);
    } else if (mode == 2) {
      text("Drawing: Lines", 0, 20);
    } else {
      text("Drawing: ", 0, 20);
    }
  }
  Simulate();
}

function mousePressed() {
  if (!run) {
    if (mode == 1) {
      let r = checkArea(mouseX, mouseY);
      if (r[0]) {
        points.push(new Point(mouseX, mouseY,points.lentgth));
      } else {
        if(mouseButton == CENTER){
           points.splice(r[1],1);
        }else{
           points[r[1]].locked = !points[r[1]].locked;
        }
      }
    }
  }
  if (run) {
    if (mouseX > width / 2 && mouseY < height - 50) {
     wind.x = 0;
    } else if (mouseX < width / 2 && mouseY < height - 50) {
     wind.x = 0;
    } else if (mouseY > height - 50) {
      wind.x = 0;
      wind.y = 0;
    }
    if (selectedPoint == null) {
      let r = checkArea(mouseX, mouseY);
      if (!r[0]) {
        selectedPoint = r[1];
        wind.x = 0;
        wind.y = 0;
      }
    }
  }
}

var lastClicked = null;
function mouseDragged() {
  if (!run) {
    if (mode == 1) {
      let r = checkArea(mouseX, mouseY);
      if (r[0]) {
        points.push(new Point(mouseX, mouseY));
      } else {
        if (lastClicked != r[1]) {
          points[r[1]].locked = !points[r[1]].locked;
          lastClicked = r[1];
        }
      }
    } else if (mode == 2) {
      selection[0] = true;
      let r = checkArea(mouseX, mouseY);
      if (!r[0]) {
        if (selection[1] == null) {
          selection[1] = points[r[1]];
        } else if (
          selection[1] != null &&
          selection[2] == null &&
          !isSame(selection[1], points[r[1]])
        ) {
          selection[2] = points[r[1]];
          sticks.push(new Stick(selection[1], selection[2]));
          selection = [false, null, null];
        }
      }
    }
  } else if (run) {
    if (selectedPoint == null) {
      if (mouseX > width / 2 && mouseY < height - 50) {
        wind.x = 0;
      } else if (mouseX < width / 2 && mouseY < height - 50) {
        wind.x = 0;
      } else if (mouseY > height - 50) {
        wind.x = 0;
        wind.y = 0;
      }
    } else if (selectedPoint != null) {
      points[selectedPoint].pos.x = mouseX;
      points[selectedPoint].pos.y = mouseY;
    }
  }
}

function isSame(p1, p2) {
  try {
    return p1.pos.x == p2.pos.x && p1.pos.y == p2.pos.y;
  } catch (e) {
    return true;
  }
  return p1.pos.x == p2.pos.x && p1.pos.y == p2.pos.y;
}

function mouseReleased() {
  selection = [false, null, null];
  wind.x = 0;
  wind.y = 0;
  selectedPoint = null;
}

function keyPressed() {
  switch (keyCode) {
    case 32:
      run = !run;
      break;
    case 81:
      mode = 1;
      break; //points
    case 87:
      mode = 2;
      break; //sticks
    case 69:
      render = ((render + 1) % 3) + 1;
      break;
    case 65:
      {
        if(run)
          genRect(200, 100, int(random(100)));
      }
      break;
    case 83:
       {
        if(run)
        {
          let _radius = int(random(100));
          let steps =  _radius >= 50 ? 20 : 100 - _radius * 2
          genCircle(400,200,_radius,int(steps));
        }
      }
      break;
    case 68:
      {
        points = [];
        sticks = [];
        break;
      }
      
  }
}

function checkArea(x, y) {
  //dont make fun
  var i = 0;
  for (var p of points) {
    if (dist(p.pos.x, p.pos.y, x, y) <= 20) {
      return [false, i];
    }
    i++;
  }
  return [true];
}

//for two points
function getDistance(a, b) {
  return dist(a.x, a.y, b.x, b.y);
}
