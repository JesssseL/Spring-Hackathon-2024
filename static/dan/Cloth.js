function genCloth(w,h,chained=false){
  //DrawPoints
  for(var i =0;i<h;i++){ 
    for(var j=0;j<w;j++){
      x = (j * 25)+(width/2-((width/2)/4));
      y = (i * 25)+(height/2-((height/2)/2));
      points.push(new Point(x,y));
      if(i == 0){
        points[i*w+j].locked = true;
      }
      if(chained){
        points[i*w+j].locked = true;
      }
    }
  }
  //DrawLines Horizontal
  for(var i=0;i<points.length-1;i++){
     if((i+1)%w != 0){
       sticks.push(new Stick(points[i],points[i+1]));
     }
  }
  //DrawLines Vertical
  for(var i=0;i<points.length-1;i++){
    if(i<((w)*(h-1))){
      sticks.push(new Stick(points[i],points[i+w]));  
    }
  }
  final = true;
}