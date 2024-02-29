class Stick{
  constructor(a,b){
    this.pointA = a;
    this.pointB = b;
    this.length = dist(this.pointA.pos.x,this.pointA.pos.y,this.pointB.pos.x,this.pointB.pos.y);
    this.off = 0;
  }
  //function setLineDash(list) {
  //  drawingContext.setLineDash(list);
  //}
  render(){
    push();
    stroke(0);
    strokeWeight(4);
   // setLineDash([5, 5]);
    
    line(this.pointA.pos.x,this.pointA.pos.y,this.pointB.pos.x+this.off,this.pointB.pos.y+this.off);
    pop();
  }
}
