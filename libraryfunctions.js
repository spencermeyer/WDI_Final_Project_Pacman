function initializeLibrary(){
  canvas  = document.getElementById("canvas");
  ctx     = canvas.getContext("2d");
  WIDTH   = canvas.width;
  HEIGHT  = canvas.height;  
  r       = 50;
  x       = 200;
  y       = 200;
  ang1    = Math.PI * 0.25;
  ang2    = Math.PI * 1.75;
  pacwise = false;
  console.log("and this is from the initializeLibrary");
  pacDots = [
  [40,40],[60,40],[80,40],[100,40],[120,40],[140,40],[160,40],[180,40],[200,40],[220,40],[240,40],[260,40], [360,40],[380,40],[400,40],[420,40],[440,40], [460,40],[480,40],[500,40],[520,40],[540,40],
  [40,60],[140,60],[260,60],[320,60],[440,60],[540,60],
  [40,600],[60,600],[80,600],[100,600],[120,600],[140,600],[160,600],[180,600],[200,600],[220,600],[240,600],[260,600],[280,600],[300,600],[320,600],[340,600],[360,600],[380,600],[400,600],[420,600],[440,600],[460,600],[480,600],[500,600],[520,600],[540,600]
  ];

  pacRects = [[60,60,60,40],[160,60,80,40],[340,60,80,40],[460,60,60,40]];
}
function clear(){
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
function drawBackGroudImage(){
  MazeBackground = new Image();
  MazeBackground.src = "Pac_man_background_image_clean2.png";
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
function drawEnemy(){
  var enemy = new Image();
  enemy.src = "Pacman_1.png";
  ctx.drawImage(enemy,200,200,23,23);
}
function canMove(direction){
    // Setup detection and disable movement if blue detected.
    // Dependent on the speed of pacman
    // Dependent on the height of pacman
    movable       = true;            // set true until blue detected
    // imageData arguments are: top left x and y coordinates of the detecting 
    // rectangle and the detecting rectangle width and height.
    switch(direction){
      case("left"):
        var topLeftX  = x-(radiusPacman + width);
        var topLeftY  = y-(radiusPacman);
        var width     = 5;
        var height    = radiusPacman*2;
      case("right"):
        var topLeftX  = x+(radiusPacman);
        var topLeftY  = y-(radiusPacman);
        var width     = 5;
        var height    = radiusPacman*2;
      case("up"):
        var topLeftX  = x-(radiusPacman-width);
        var topLeftY  = y-(radiusPacman+width);
        var width     = radiusPacman*2;
        var height    = 5;
      case("down"):
        var topLeftX  = x-(radiusPacman);
        var topLeftY  = y+(radiusPacman);
        var width     = radiusPacman*2;
        var height    = 5;
    }
    var imageData = ctx.getImageData(topLeftX, topLeftY, width, height).data;
  // console.log(imageData);
  for (i=0; i<imageData.length; i+=4){
    //console.log(i, imageData[i]);
    // iterate throught the array reading rgb(a) and determining colour.
    if(imageData[i]<100 && imageData[i+1]<100 && imageData[i+2]>180){
      //console.log("blue detected !!!!");
      movable = false;
    }else{
      movable = true;
    };
  };
  return movable;
}


