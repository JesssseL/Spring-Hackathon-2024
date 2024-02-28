let BBsad;
let BBok;
let BBamaze;
let BBworry;
let speachBub
let BBspeak = 'Youre so slay bbg';
function preload() {
  BBsad = loadImage('static/BB/depression.PNG');
  BBok = loadImage('static/BB/happy.PNG');
  BBamaze = loadImage('static/BB/yippee.PNG');
  BBworry = loadImage('static/BB/anxiety.PNG');
  speachBub = loadImage('static/BB/speach.png');
}
//BB the Bucket Bot
let BucketBotArr = {
  sad: BBsad,
  happy: BBok,
  good: BBamaze,
  worry: BBworry,
}

function drawBB() {
  let wantToBe = windowW/2.5
  let newHeight = (BBok.height * wantToBe) / speachBub.width;
  image(speachBub, windowW-(225+(wantToBe/2)), windowH*0.43, wantToBe, newHeight);

  fill('black')
  text(BBspeak, windowW/2, windowH-225, windowW-(windowW/3));

  // Calculate the proportional height
  wantToBe = windowW/5
  newHeight = (BBok.height * wantToBe) / BBok.width;
  image(BBsad, windowW-225, windowH-wantToBe, wantToBe, newHeight);
}