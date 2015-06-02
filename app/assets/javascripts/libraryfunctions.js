function initializeLibrary(){
  canvas      = document.getElementById("canvas");
  ctx         = canvas.getContext("2d");
  WIDTH       = canvas.width;
  HEIGHT      = canvas.height;  
  r           = 50;                       // 
  x           = 200;                      // pacman x position
  y           = 405;                      // pacman y position
  increment   = 5;                        // how many pixels pacman advances
  incrementg  = 4;                        // ghost 1 movement distance
  score       = 0;                        // keep track of the score to display
  direction   = "right";                  // initialise a direction for pacman
  xg1         = 270;                      // starting position ghost 1
  yg1         = 255;                      // starting position ghost 1
  xg2         = 280;                      // starting position ghost 2
  yg2         = 290;                      // starting position ghost 2
  xg3         = 265;                      // starting position ghost 3
  yg3         = 292;                      // starting position ghost 3
  xg4         = 287;                      // starting position ghost 4
  yg4         = 294;                      // starting position ghost 4
  dirg1       = "right";                  // initialize ghost 1 direction
  dirg2       = "up";                     // initialize ghost 2 direction
  dirg3       = "left";                   // initialize ghost 3 direction
  dirg4       = "down";                   // initialize ghost 4 direction
  ang1        = Math.PI * 0.25;           // initialize a drawing angle st
  ang2        = Math.PI * 1.75;           // initialize a drawing angle fin
  pacwise     = false;                    // initialise a drawing direction
  score       = 0;                        // cumulative score
  lives       = 3;                        // number of lives left initilise
  dead        = false;                    // monitor status of pacman
  invincible  = false;                    // invincibility granted on PowerDots
  ghost1alive = true;                     // can be killed by Pac when Pac is invinc
  ghost2alive = true;                     // can be killed by Pac when Pac is invinc
  ghost3alive = true;                     // can be killed by Pac when Pac is invinc
  ghost4alive = true;                     // can be killed by Pac when Pac is invinc
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
  MazeBackground.src = "/assets/Pac_man_background_image_clean.png";
  ctx.drawImage(MazeBackground,0,0,560,620);
}

// MazeBackground.src = "../../assets/images/Pac_man_background_image_clean.png";
//


//     *****  REDUNDANT CODE ???? ???  *****
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
    if (x<0) {x=560};
    collision();
    break;
    case("right"):
    if (canMove(direction,x,y)){x=x+increment};
    if (x>560){x=0};
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

function drawPowerDots(){
  for (i=0; i<pacPowerDots.length; i++){
    ctx.beginPath();
    ctx.arc(pacPowerDots[i][0],pacPowerDots[i][1],5,0,Math.PI*2);
    ctx.fillStyle="yellow";
    ctx.fill();
    ctx.closePath;
  }
}

function drawGhost(){
  // draw the first ghost, make it blue when pac is invincible and 
  // make it into eyes when eaten.
  var enemy1 = new Image();
  if (invincible && ghost1alive){
    enemy1.src = "/assets/Ghost_5.png";
  }else if (ghost1alive){
    enemy1.src = "/assets/Ghost_1.png";
  }else{
    enemy1.src = "/assets/Ghost_eyes.png";
  }
  ctx.drawImage(enemy1,xg1-12,yg1-12,24,24);
  //
  // draw the second ghost it is a different colour when alive
  var enemy2 = new Image();
  if (invincible && ghost2alive){
    enemy2.src = "/assets/Ghost_5.png";
  }else if (ghost2alive){
    enemy2.src = "/assets/Ghost_2.png";
  }else{
    enemy2.src = "/assets/Ghost_eyes.png";
  }
  ctx.drawImage(enemy2,xg2-12,yg2-12,24,24);
  //
  // draw the third ghost it is a different colour when alive
  var enemy3 = new Image();
  if (invincible && ghost3alive){
   enemy3.src = "/assets/Ghost_5.png";
 }else if (ghost3alive){
   enemy3.src = "/assets/Ghost_3.png";
 }else{
   enemy3.src = "/assets/Ghost_eyes.png";
 }
 ctx.drawImage(enemy3,xg3-12,yg3-12,24,24);
  // draw the fourth ghost it is a different colour when alive
  var enemy4 = new Image();
  if (invincible && ghost4alive){
   enemy4.src = "/assets/Ghost_5.png";
 }else if (ghost4alive){
   enemy4.src = "/assets/Ghost_4.png";
 }else{
   enemy4.src = "/assets/Ghost_eyes.png";
 }
 ctx.drawImage(enemy4,xg4-12,yg4-12,24,24);
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
  };
  if(score>1000){
    incrementg = 6;
  }
}

function moveGhostRand(){
  // Starts from the initialised direction, then moves until it finds
  // a wall then changes to a random direction then repeats.
  var directions = ['up', 'down', 'right', 'left'];  
  
  //  here set the hunter function for ghost 1
  //  Basis is of following the x y coordinates of pac with probability
  p1=Math.random();
  if (x<xg1 && p1>0.25){dirg1 = "left"};
  if (y<yg1 && p1>0.25){dirg1 = "up"};
  if (x>xg1 && p1>0.25){dirg1 = "right"};
  if (y>yg1 && p1>0.25){dirg1 = "down"};

  if (dirg1 === "left" && canMove(dirg1,xg1,yg1)) {
    xg1 = xg1 - incrementg;
    //console.log("true - ghost moving left");
  }
  else if (dirg1 === "right" && canMove(dirg1,xg1,yg1)) { 
    xg1 = xg1 + incrementg;
    //console.log("true - ghost moving right");
  }
  else if (dirg1 === "up" && canMove(dirg1,xg1,yg1)) {
    yg1 = yg1 - incrementg;
    //console.log("true - ghost moving up");
  }
  else if (dirg1 === "down" && canMove(dirg1,xg1,yg1)) {
    yg1 = yg1 + incrementg;
    //console.log("true - ghost moving down");
  }
  else {
    dirg1 = directions[Math.floor(Math.random() * directions.length)];
    //console.log("canmove is false changing direction to", dirg1);
  }
  // Repeat for ghost 2
  if (dirg2 === "left" && canMove(dirg2,xg2,yg2)) {
    xg2 = xg2 - incrementg;
    //console.log("true - ghost moving left");
  }
  else if (dirg2 === "right" && canMove(dirg2,xg2,yg2)) { 
    xg2 = xg2 + incrementg;
    //console.log("true - ghost moving right");
  }
  else if (dirg2 === "up" && canMove(dirg2,xg2,yg2)) {
    yg2 = yg2 - incrementg;
    //console.log("true - ghost moving up");
  }
  else if (dirg2 === "down" && canMove(dirg2,xg2,yg2)) {
    yg2 = yg2 + incrementg;
    //console.log("true - ghost moving down");
  }
  else {
    dirg2 = directions[Math.floor(Math.random() * directions.length)];
    //console.log("canmove is false changing direction to", dirg1);
  }
  // Repeat for ghost 3
  if (dirg3 === "left" && canMove(dirg3,xg3,yg3)) {
    xg3 = xg3 - incrementg;
    //console.log("true - ghost moving left");
  }
  else if (dirg3 === "right" && canMove(dirg3,xg3,yg3)) { 
    xg3 = xg3 + incrementg;
    //console.log("true - ghost moving right");
  }
  else if (dirg3 === "up" && canMove(dirg3,xg3,yg3)) {
    yg3 = yg3 - incrementg;
    //console.log("true - ghost moving up");
  }
  else if (dirg3 === "down" && canMove(dirg3,xg3,yg3)) {
    yg3 = yg3 + incrementg;
    //console.log("true - ghost moving down");
  }
  else {
    dirg3 = directions[Math.floor(Math.random() * directions.length)];
    //console.log("canmove is false changing direction to", dirg1);
  }
  // Repeat for ghost 4
  if (dirg4 === "left" && canMove(dirg4,xg4,yg4)) {
    xg4 = xg4 - incrementg;
    //console.log("true - ghost moving left");
  }
  else if (dirg4 === "right" && canMove(dirg4,xg4,yg4)) { 
    xg4 = xg4 + incrementg;
    //console.log("true - ghost moving right");
  }
  else if (dirg4 === "up" && canMove(dirg4,xg4,yg4)) {
    yg4 = yg4 - incrementg;
    //console.log("true - ghost moving up");
  }
  else if (dirg4 === "down" && canMove(dirg4,xg4,yg4)) {
    yg4 = yg4 + incrementg;
    //console.log("true - ghost moving down");
  }
  else {
    dirg4 = directions[Math.floor(Math.random() * directions.length)];
    //console.log("canmove is false changing direction to", dirg1);
  }
}

function canMove(directionF,xx,yy){
    // console.log(directionF,xx,yy)
    // This function scans ahead of the movement direction and sees if there
    // is one pixel of blue and if so stops movement in that direction.
    // This is used by the pacman and by the ghosts.
    // First set up the directions and locations of the scan box.   
    switch(directionF){
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
      break;
      case("up"):
      var width     = radiusPacman*2;
      var height    = 6;
      var topLeftX  = xx-(radiusPacman);
      var topLeftY  = yy-(radiusPacman+height);
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
      chompSound();
    }
  }
  //  This function takes away powerdots if they are eaten and confers
  //  invincibility to pacman.
  for (i=0; i<pacPowerDots.length; i+=1){ 
    if ((x-radiusPacman) < pacPowerDots[i][0] && (x+radiusPacman) > pacPowerDots[i][0] && (y-radiusPacman)<pacPowerDots[i][1] && (y+radiusPacman)>pacPowerDots[i][1]){
      pacPowerDots.splice(i,1);    // take away the pac dot if it is eaten
      score = score + 50;         // update the score that is then written to screen
      invincible = true;           // make pacman invincible
      // set a timer to time out and remove invincibility 
      var myVar2=setInterval(function () {clearInvincibility()}, 5000);
    }
  }
  
  // and now to test if there is a collision between the pacman and a ghost
  // and loose a life if this happens.
  if ( Math.abs(x-xg1)<2*radiusPacman && Math.abs(y-yg1)<2*radiusPacman  )  {
   if(invincible){
    ghost1alive = false;
    score = score + 200;
  }else{
    lives = lives -1 ;       // reduce the lives if pacman is not invincible
    dead = true;             // sets value so that banner knows to display
    deathMode();              // freezes play and displays message for 2 secs
  };
}
  // check the same for ghost 2
  if ( Math.abs(x-xg2)<2*radiusPacman && Math.abs(y-yg2)<2*radiusPacman  )  {
   if(invincible){
    ghost2alive = false;
    score = score + 200;
  }else{
    lives = lives -1 ;       // reduce the lives if pacman is not invincible
    dead = true;
    deathMode();
  };
}
  // check the same for ghost 3
  if ( Math.abs(x-xg3)<2*radiusPacman && Math.abs(y-yg3)<2*radiusPacman  )  {
   if(invincible){
    ghost3alive = false;
    score = score + 200;
  }else{
    lives = lives -1 ;       // reduce the lives if pacman is not invincible
    dead = true;
    deathmode();
  };
}
  // check the same for ghost 4
  if ( Math.abs(x-xg4)<2*radiusPacman && Math.abs(y-yg4)<2*radiusPacman  )  {
   if(invincible){
    ghost4alive = false;
    score = score + 200;
  }else{
    lives = lives -1 ;       // reduce the lives if pacman is not invincible
    dead = true;
    deathMode();
  };
}
}

function clearInvincibility(){
  invincible = false;
}

function deathMode(){
  console.log("deathmode entered")
  increment = 0;
  incrementg = 0;
  if(lives<1){timertime=60000}else{timertime=3000};
  var myVar=setTimeout(deathTimer, timertime);
  function deathTimer(){
    console.log("deathtimer entered");
    increment = 5;
    incrementg = 6;
    dead = false;
  }
}

function drawDeath(){
  if(dead){
    ctx.lineWidth = 1;
    ctx.font="50px ARCADE";
    ctx.strokeStyle = 'white';
    if(lives<1){messagetext="GAME OVER ! ! !"}else{messagetext="LOSE A LIFE ! ! !"}
    ctx.strokeText(messagetext,150,350);
  x = 200;              // reset position back to starting so that pac does
  y = 200;              // not continuously lose life in same position
}
}

function drawScore(){
  ctx.lineWidth = 1;
  ctx.font="30px ARCADE";
  ctx.strokeStyle = 'white';
  ctx.strokeText("Score: "+score,10,40);
}

function chompSound(){
  var eat = new Audio('/assets/pacman_chomp_2.wav');
  console.log("trying to play sound chomp")
  eat.play();
}

