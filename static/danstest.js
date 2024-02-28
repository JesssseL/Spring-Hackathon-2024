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
let gravity;
let selection = [false, null, null];
let slider;
let selectedPoint = null;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight - window.innerHeight / 4);
  textSize(20);
  angleMode(DEGREES);
  slider = createSlider(1, 3, 1.5, 0.5);
  gravity = createVector(0, 1);

  // Add points to simulate lamp pullstring
  points.push(new Point(width / 2, height / 4));
  points.push(new Point(width / 2, height / 2));
  points.push(new Point(width / 2, height * 3 / 4));

  // Connect points with sticks
  sticks.push(new Stick(points[0], points[1]));
  sticks.push(new Stick(points[1], points[2]));
}

function draw() {
  background("#02bef2");
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
        points.push(new Point(mouseX, mouseY,points.length));
      } else {
        if(mouseButton == CENTER){
           points.splice(r[1],1);
        }else{
           points[r[1]].locked = !points[r[1]].locked;
        }
      }
    }
  }
}

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
    if (selectedPoint != null) {
      points[selectedPoint].pos.x = mouseX;
      points[selectedPoint].pos.y = mouseY;
    }
  }
}

function mouseReleased() {
  selection = [false, null, null];
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
