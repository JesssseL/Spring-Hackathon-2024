function genRect(x=150,y=100,w=100,h=w,stable=true,chained=false){
    var meP = [];
    var meS = [];
    meP.push(new Point(x,y,chained));
    meP.push(new Point(x+w,y,chained));
    meP.push(new Point(x+w,y+h,chained));
    meP.push(new Point(x,y+h,chained));
    for(var i =0;i<4;i++){
      sticks.push(new Stick(meP[i],meP[(i+1)%4]));
    }
    if(stable){
      meS.push(new Stick(meP[0],meP[2]));
      meS.push(new Stick(meP[1],meP[3]));
    }
    points = points.concat(meP);
    sticks = sticks.concat(meS);
}