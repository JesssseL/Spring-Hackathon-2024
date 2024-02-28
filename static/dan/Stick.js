class Stick{
  constructor(a,b){
    this.pointA = a;
    this.pointB = b;
    this.length = dist(this.pointA.pos.x,this.pointA.pos.y,this.pointB.pos.x,this.pointB.pos.y);
    this.off = 0;
  }
  render(){
    push();
    stroke(255);
    strokeWeight(4);
    line(this.pointA.pos.x,this.pointA.pos.y,this.pointB.pos.x+this.off,this.pointB.pos.y+this.off);
    pop();
  }
}
