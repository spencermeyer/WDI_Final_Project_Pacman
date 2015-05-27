function initializeLibrary(){
  canvas  = document.getElementById("canvas");
  ctx     = canvas.getContext("2d");
  WIDTH   = canvas.width;
  HEIGHT  = canvas.height;  
  r       = 50;
  x       = 200;
  y       = 200;
  dirg1   = "down";                       // initialise direction ghost
  incrementg  = 1;                        // ghost 1 movement distance
  xg1     = 270;                          // starting position ghost 1
  yg1     = 290;                          // starting position ghost 1
  dirg1   = "right";                      // initialize a ghost direction
  ang1    = Math.PI * 0.25;               // initialize a drawing angle st
  ang2    = Math.PI * 1.75;               // initialize a drawing angle fin
  pacwise = false;                        // initialise a drawing direction
  score   = 0;                            // cumulative score
  lives = 3;                              // number of lives left initilise
  console.log("and this is from the initializeLibrary");
}

function clear(){
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
function drawLives(){
// This function draws one, two, or three right facing pacs at the 
// bottom of the screen depending upon the number of lives left.
  ctx.font="30px ARCADE";             // Write the word "lives"
  ctx.strokeStyle = 'white';           // at the bottom of the screen
  ctx.strokeText("LIVES: ",10,615);   // in white arcade font.
  radiusPacman = 13;
  var colorPacman  = "yellow";
  ctx.beginPath();
  ctx.moveTo(115,605);
  ctx.arc(115,605,radiusPacman,0.25*Math.PI,1.75*Math.PI,false);  // x and y are the circle centre
  ctx.lineTo(115,605);
  ctx.fillStyle=colorPacman;
  ctx.fill();
  ctx.closePath;
  if(lives>1){
    ctx.beginPath();
    ctx.moveTo(145,605);
  ctx.arc(145,605,radiusPacman,0.25*Math.PI,1.75*Math.PI,false);  // x and y are the circle centre
  ctx.lineTo(145,605);
  ctx.fillStyle=colorPacman;
  ctx.fill();
  ctx.closePath;
}
if(lives>2){
  ctx.beginPath();
  ctx.moveTo(175,605);
  ctx.arc(175,605,radiusPacman,0.25*Math.PI,1.75*Math.PI,false);  // x and y are the circle centre
  ctx.lineTo(175,605);
  ctx.fillStyle=colorPacman;
  ctx.fill();
  ctx.closePath;
}
}
function drawBackGroundImage(){
  // This puts the background image onto the canvas.
  // Important: do not change the dimensions.
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
  // console.log(x,y);
}
function movePacMan(){
  switch(direction){
    case("left"):
    if (canMove(direction,x,y)) {x = x - increment};
    collision();
    break;
    case("right"):
    if (canMove(direction,x,y)){x=x+increment};
    collision();
    break;
    case("up"):
    if(canMove(direction,x,y)){y=y-increment};
    collision();
    break;
    case("down"):
    if(canMove(direction,x,y)){y=y+increment};
    collision();
    break;
  }
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

function drawGate(){
  ctx.beginPath();
  ctx.moveTo(260,270);
  ctx.lineTo(300,270);
  ctx.lineWidth = 7;
  ctx.strokeStyle = '#0000FF';
  if(score<100){
    ctx.stroke();
    ctx.closePath;
    console.log("linewidth", ctx.lineWidth);
  }
}

function moveGhostRand(){
  // Starts from the initialised direction, then moves until it finds
  // a wall then changes to a random direction then repeats.
  var directions = ['up', 'down', 'right', 'left'];  
  
  if (dirg1 === "left" && canMove(dirg1,xg1,yg1)) {
    xg1 = xg1 - incrementg;
    //console.log("moving left");
  }
  if (dirg1 === "right" && canMove(dirg1,xg1,yg1)) {
    xg1 = xg1 + incrementg;
    //console.log("moving right");
  }
  if (dirg1 === "up" && canMove(dirg1,xg1,yg1)) {
    yg1 = yg1 + incrementg;
    //console.log('moving up');
  }
  if (dirg1 === "down" && canMove(dirg1,xg1,yg1)) {
    yg1 = yg1 - incrementg;
    //console.log("moving down");
  }
  else {
    dirg1 = directions[Math.floor(Math.random() * directions.length)];
    //console.log("canmove is false changing direction to", dirg1);
  }
}

function canMove(direction,xx,yy){
    // This function scans ahead of the movement direction and sees if there
    // is one pixel of blue and if so stops movement in that direction.
    // This is used by the pacman and by the ghosts.
    // First set up the directions and locations of the scan box.   
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
    imageData = ctx.getImageData(topLeftX, topLeftY, width, height).data;
    // Now get the image data for scanning.
    // console.log(topLeftX, topLeftY, width, height); 
    // now set variable blueFound to false and iterate through the array, and 
    // set blueFound to true if ANY of the pixels are blue.
    var blueFound = false;
    for (i=0; i<imageData.length; i+=4){
      // console.log("image data length", imageData.length);
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
  // This function tests if the pacman xy coordinates match a pacdot coordinate 
    // and if so eats it.  Tolerance level is the radius of the pacman.
    for (i=0; i<pacDots.length; i+=1){
      if ((x-radiusPacman) < pacDots[i][0] && (x+radiusPacman) > pacDots[i][0] && (y-radiusPacman)<pacDots[i][1] && (y+radiusPacman)>pacDots[i][1]){
      pacDots.splice(i,1);    // take away the pac dot if it is eaten
      score = score + 10;     // update the score that is then written to screen
    }
  }
  // and now to test if there is a collision between the pacman and a ghost
  // and loose a life if this happens.
  if ( Math.abs(x-xg1)<2*radiusPacman && Math.abs(y-yg1)<2*radiusPacman  )  {
   lives = lives -1 ;    // reduce the lives by one
   setTimeout(function(){
          drawDeath(); //  NEEDS SOME WORK.....
        }, 2000);
 }
}
function drawDeath(){
  ctx.lineWidth = 1;
  ctx.font="50px ARCADE";
  ctx.strokeStyle = 'white';
  ctx.strokeText("LOOSE A LIFE !!!!!",150,350);
  x = 200;              // reset position back to starting so that pac does
  y = 200;              // not continuously loose life in same position
}


function drawScore(){
  ctx.lineWidth = 1;
  ctx.font="30px ARCADE";
  ctx.strokeStyle = 'white';
  ctx.strokeText("Score: "+score,10,40);
}

