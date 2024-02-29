class Point{
  constructor(x,y,locked=false){
    this.pos = createVector(x,y);
    this.prevPos = createVector(x,y);
    this.locked = locked;
  }
  
  render(){
    push()
    noStroke();
    fill(130);
    if(this.locked) fill("#ff5f5c");
    circle(this.pos.x,this.pos.y,15)
    pop()
  }
}