function genCircle(x,y,r,steps=20,stable=true,chained=false){
  var meP = [];
  var meS = [];
  for(let i=0;i<361;i+=steps){
      var Px = (cos(i) * (r+20))  + x;
      var Py = (sin(i) * (r+20))  + y;
      meP.push(new Point(Px,Py,chained));
  }
  for(let i =0;i<meP.length;i++){
    meS.push(new Stick(meP[i],meP[(i+1)%meP.length]));
  }
  if(stable){
    for(let i=1;i<(meP.length/2);i++){
      meS.push(new Stick(meP[i],meP[(i+Math.ceil(meP.length/2))-1]));
    }
  }
  points = points.concat(meP);
  sticks = sticks.concat(meS);
}