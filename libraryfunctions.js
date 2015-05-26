function initializeLibrary(){
  canvas  = document.getElementById("canvas");
  ctx     = canvas.getContext("2d");
  WIDTH   = canvas.width;
  HEIGHT  = canvas.height;  
  r       = 50;
  x       = 200;
  y       = 200;
  dirg1   = "down";
  incrementg  = 1;
  xg1     = 20;
  yg1     = 78;
  ang1    = Math.PI * 0.25;
  ang2    = Math.PI * 1.75;
  pacwise = false;
  score   = 0;
  console.log("and this is from the initializeLibrary");
  // pacRects = [[60,60,60,40],[160,60,80,40],[340,60,80,40],[460,60,60,40]];
  //DO NOT NEED PACRECTS DELETE THE ABOVE AFTER TESTING.
}
function clear(){
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
function drawLives(){
  ctx.font="30px ARCADE";             // Write the word "lives"
  ctx.strokeStyle = 'white';           // at the bottom of the screen
  ctx.strokeText("LIVES: ",10,615);   // in white arcade font.
  radiusPacman = 13;
  var colorPacman  = "yellow";
  ctx.beginPath();
  ctx.moveTo(115,605);
  ctx.arc(115,605,radiusPacman,ang1,ang2,pacwise);  // x and y are the circle centre
  ctx.lineTo(115,605);
  ctx.fillStyle=colorPacman;
  ctx.fill();
  ctx.closePath;
if(lives>1){
  ctx.beginPath();
  ctx.moveTo(145,605);
  ctx.arc(145,605,radiusPacman,ang1,ang2,pacwise);  // x and y are the circle centre
  ctx.lineTo(145,605);
  ctx.fillStyle=colorPacman;
  ctx.fill();
  ctx.closePath;
}
if(lives>2){
  ctx.beginPath();
  ctx.moveTo(175,605);
  ctx.arc(175,605,radiusPacman,ang1,ang2,pacwise);  // x and y are the circle centre
  ctx.lineTo(175,605);
  ctx.fillStyle=colorPacman;
  ctx.fill();
  ctx.closePath;
}
}
function drawBackGroudImage(){
  MazeBackground = new Image();
  MazeBackground.src = "Pac_man_background_image_clean.png";
  ctx.drawImage(MazeBackground,0,0,560,620);
}

function drawRects(){
  for (i=0; i<pacRects.length; i++){
    ctx.strokeStyle = '#00008F';
    ctx.lineWidth = 3;
    ctx.strokeRect(pacRects[i][0],pacRects[i][1],pacRects[i][2],pacRects[i][3]);
    ctx.closePath;
  }
}
function pacman(){
  radiusPacman = 13;
  var colorPacman  = "yellow";
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.arc(x,y,radiusPacman,ang1,ang2,pacwise);  // x and y are the circle centre
  ctx.lineTo(x,y);
  ctx.fillStyle=colorPacman;
  ctx.fill();
  ctx.closePath;
}
function drawDots(){
  for (i=0; i<pacDots.length; i++){
    // console.log("example pacdot", pacDots[i][0], pacDots[i][1]);
    ctx.beginPath();
    ctx.arc(pacDots[i][0],pacDots[i][1],2,0,Math.PI*2);
    ctx.fillStyle="yellow";
    ctx.fill();
    ctx.closePath;
  }
}
function drawGhost(){
  var enemy = new Image();
  enemy.src = "Ghost_1.png";
  ctx.drawImage(enemy,xg1,yg1,23,23);
}
function moveGhostRand(){
  choice = Math.random();
  if(0<choice<0.25){dirg1 = "up"}
  else if(0.25<choice<0.5){dirg1 = "down"}
  else if(0.5<choice<0.75){dirg1 = "right"}
  else {dirg1 = "left"};
  //console.log("ghost direction", dirg1, canMove(dirg1,xg1,yg1));
  if (dirg1 = "left" && canMove(dirg1,xg1,yg1)) {xg1 = xg1 - incrementg}
  if (dirg1 = "right" && canMove(dirg1,xg1,yg1)) {xg1 = xg1 + incrementg}
  else if (dirg1 = "down" && canMove(dirg1,xg1,yg1)) {yg1 = yg1 + incrementg}
  else if (dirg1 = "left" && canMove(dirg1,xg1,yg1)) {yg1 = yg1 - incrementg};
}



function canMove(direction,xx,yy){
    // Setup detection and disable movement if blue detected.
    // Dependent on the speed of object
    // Dependent on the height of object
    // imageData arguments are: top left x and y coordinates of the detecting 
    // rectangle and the detecting rectangle width and height.
    switch(direction){
      case("left"):
      var width     = 6;
      var height    = radiusPacman*2;
      var topLeftX  = xx-(radiusPacman+width);
      var topLeftY  = yy-(radiusPacman);
      break;
      case("right"):
      var width     = 6;
      var height    = radiusPacman*2;
      var topLeftX  = xx+(radiusPacman);
      var topLeftY  = yy-(radiusPacman);
      //console.log("xx=",xx,"top left xx = ", topLeftX, direction);
      break;
      case("up"):
      var width     = radiusPacman*2;
      var height    = 6;
      var topLeftX  = xx-(radiusPacman);
      var topLeftY  = yy-(radiusPacman+width);
      break;
      case("down"):
      var width     = radiusPacman*2;
      var height    = 6;
      var topLeftX  = xx-(radiusPacman);
      var topLeftY  = yy+(radiusPacman);
      break;
    }
    var imageData = ctx.getImageData(topLeftX, topLeftY, width, height).data;
    console.log(topLeftX, topLeftY, width, height);
    //console.log(imageData);
    // now set variable blueFound to false and iterate through the array, and 
    // set blueFound to true if ANY of the pixels are blue.
    var blueFound = false;
    for (i=0; i<imageData.length; i+=4){
      //console.log("image data length", imageData.length);
      // iterate throught the array reading rgb(a) and determining colour.
      if(imageData[i]<100 && imageData[i+1]<100 && imageData[i+2]>165){
        blueFound = true; 
        //console.log("blue detected !!!!");
        //console.log(imageData[i],imageData[i+1],imageData[i+2]);
      }
    };
    if (blueFound){
      return false;
    }else{
      return true;
    }
  }

  function collision(){
// this function tests if the pacman xy coordinates match a pacdot coordinate 
// and if so eats it.  Tolerance level is the radius of the pacman.
for (i=0; i<pacDots.length; i+=1){
  if ((x-radiusPacman) < pacDots[i][0] && (x+radiusPacman) > pacDots[i][0] && (y-radiusPacman)<pacDots[i][1] && (y+radiusPacman)>pacDots[i][1]){
      pacDots.splice(i,1);    // take away the pac dot if it is eaten
      score = score + 10;
    }
  }
}
function drawScore(){
  ctx.font="30px ARCADE";
  ctx.strokeStyle = 'white';
  ctx.strokeText("Score: "+score,10,40);
}







