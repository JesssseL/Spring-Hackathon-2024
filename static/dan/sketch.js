/*
  Author: Noah Breedy
  Description: A cool way to simulate ropes and softbodies
  I made this project origionally for my create task in apcsp and I say it turned out 
  pretty good and I cannot complain
  Finished 2/5/2022 @ 3:43 a.m.
*/
//For Light Switch
let points = [];
let sticks = [];
let run = true;
let mode = 0;
let renderSwitch = 1;
let gravity, wind, bound;
let selection = [false, null, null];
let slider;
let final = false;
let selectedPoint = null;
let dark = false;

function setup() {
  //createCanvas(window.innerWidth, window.innerHeight - window.innerHeight / 4);
  createCanvas(500, 500)
  textSize(20);
  angleMode(DEGREES);
  //slider = createSlider(1, 3, 1.5, 0.5);
  gravity = createVector(0, 1);
  wind = createVector(0, 0);
  bound = createVector(1, 0);
  makePuller() 
}

function draw() {
  if (dark){
    background("#AC85EB");
  } else {
  background("#33C7BC");
  }
  fill(255);
  Simulate();
}
function makePuller() {
  points.push(new Point(220, -10 ,points.length));
  points.push(new Point(220, 87 ,points.length));
  sticks.push(new Stick(points[0], points[1]));
  points.push(new Point(220, 131 ,points.length));
  sticks.push(new Stick(points[1], points[2]));
  points.push(new Point(220, 175 ,points.length));
  sticks.push(new Stick(points[2], points[3]));
  points.push(new Point(220, 221 ,points.length));
  sticks.push(new Stick(points[3], points[4]));
  for (let p in points){
    if(p==0){
      points[p].locked = true
    } else{
    points[p].locked = false
  }
  }
}

function mousePressed() {
    if (run) {
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
  if (run) {
    if (selectedPoint != null) {
      points[selectedPoint].pos.x = mouseX;
      points[selectedPoint].pos.y = mouseY;
      dark = !dark;
    }
  }
}

function mouseReleased() {
  selection = [false, null, null];
  wind.x = 0;
  wind.y = 0;
  selectedPoint = null;
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
