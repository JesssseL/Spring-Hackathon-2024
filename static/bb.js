let BBimg = 1;
let BBsad;
let BBok;
let BBamaze;
let BBworry;
let speachBub
let BBspeak = 'Bucket Talks here';
let TUTORIAL_STEP = 0;
let easyfix = false;

function preload() {
  BBsad = loadImage('static/BB/depression.PNG');
  BBok = loadImage('static/BB/happy.PNG');
  BBamaze = loadImage('static/BB/yippee.PNG');
  BBworry = loadImage('static/BB/anxiety.PNG');
  speachBub = loadImage('static/BB/speach.png');

  BBimages = [BBsad, BBok, BBamaze, BBworry]
}
//BB the Bucket Bot
let BucketBotArr = {
  sad: BBsad,
  happy: BBok,
  good: BBamaze,
  worry: BBworry,
}

function drawBB() {
  if (TUTORIAL_STEP <= 5 || TUTORIAL_STEP > 10) {
  let wantToBe = windowW/2.5
  let newHeight = (BBok.height * wantToBe) / speachBub.width;

  // Calculate the proportional height
  wantToBe = windowW/5
  newHeight = (BBok.height * wantToBe) / BBok.width;
  // Draw oval behind the text
  fill('white');
  stroke('black');
  strokeWeight(1.5); // Adjust the stroke weight as needed
  let ovalWidth = wantToBe
  let ovalHeight = ovalWidth / 2; // Making the oval half as tall
  ellipse((windowW * 0.9) - wantToBe + (windowW / 10), windowH - (wantToBe*1.20) + (windowW / 20), ovalWidth, ovalHeight);
  strokeWeight(1);
  //Text
  textStyle(NORMAL)
  textSize(15)
  fill('black')
  text(BBspeak, (windowW*0.9)-wantToBe, (windowH*0.98)-wantToBe, windowW/5);
  //Image
  image(BBimages[BBimg], windowW-wantToBe, windowH-wantToBe, wantToBe, newHeight);
  }
}

function tutorial() {
  //how too...
  if (TUTORIAL_STEP == 0) {
    BBspeak = 'Hi Welcome to Buckets \n and Balls!! \n [click to continue]';
    BBimg = 1;
  } else if (TUTORIAL_STEP == 1) {
    BBspeak = 'Lets get on with this why dont you try grabbing a ball';
    BBimg = 3;
  } else if (TUTORIAL_STEP == 2) {
    BBspeak = 'Whoah good job!! \n [click to continue]';
    BBimg = 2;
    easyfix = false;
  } else if (TUTORIAL_STEP == 3) {
    BBspeak = 'These balls represent differant projects a building can undertake';
    BBimg = 1;
  } else if (TUTORIAL_STEP == 4) {
    BBspeak = 'Try dragging a blue solar pannel ball into a building to see how it works';
    BBimg = 3;
    checkSolarTut();
  } else if (TUTORIAL_STEP == 5) {
    BBspeak = 'Perfect!! \n You seem to get it!';
    BBimg = 2;
  } else if (TUTORIAL_STEP == 15) {
    BBspeak = 'AHHH!! \n HURRY UP!!!';
    BBimg = 0;
  } else {
    BBspeak = '';
  }
}

function checkSolarTut() {
  for (var ball of allBalls) {
    if (ball.getType() == 'solar' && ball.getBuilding() != null) {
      TUTORIAL_STEP = 5
      currentTime = 0;
    }
  }
}