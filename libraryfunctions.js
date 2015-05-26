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
  score   = 0;
  console.log("and this is from the initializeLibrary");
  pacDots = [
  [30,78],[50,78],[70,78],[90,78],[110,78],[130,78],[150,78],[170,78],[190,78],[220,78],[240,78],[260,78],[280,78],[300,78],[320,78],[340,78], [360,78],[380,78],[400,78],[420,78],[440,78], [460,78],[480,78],[500,78],[520,78],[535,78],
  [30,98],[130,98],[250,98],[310,98],[435,98],[535,98],
  [30,118],[130,118],[250,118],[310,118],[435,118],[535,118],
  [30,145],[50,145],[70,145],[90,145],[110,145],[130,145],[150,145],[170,145],[190,145],[220,145],[240,145],[260,145],[280,145],[300,145],[320,145],[340,145], [360,145],[380,145],[400,145],[420,145],[440,145], [460,145],[480,145],[500,145],[520,145],[535,145],
  [30,560],[60,560],[80,560],[100,560],[120,560],[140,560],[160,560],[180,560],[200,560],[220,560],[240,560],[260,560],[280,560],[300,560],[320,560],[340,560],[360,560],[380,560],[400,560],[420,560],[440,560],[460,560],[480,560],[500,560],[520,560],[540,560]
  ];6

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
    // imageData arguments are: top left x and y coordinates of the detecting 
    // rectangle and the detecting rectangle width and height.
    switch(direction){
      case("left"):
      var width     = 10;
      var height    = radiusPacman*2;
      var topLeftX  = x-(radiusPacman+width);
      console.log("x=",x,"top left x = ", topLeftX, direction, "radiusPacman",radiusPacman);
      var topLeftY  = y-(radiusPacman);
      break;
      case("right"):
      var width     = 10;
      var height    = radiusPacman*2;
      var topLeftX  = x+(radiusPacman);
      console.log("x=",x,"top left x = ", topLeftX, direction);
      var topLeftY  = y-(radiusPacman);
      break;
      case("up"):
      var width     = radiusPacman*2;
      var height    = 10;
      var topLeftX  = x-(radiusPacman);
      var topLeftY  = y-(radiusPacman+width);
      break;
      case("down"):
      var width     = radiusPacman*2;
      var height    = 10;
      var topLeftX  = x-(radiusPacman);
      var topLeftY  = y+(radiusPacman);
      break;
    }
    var imageData = ctx.getImageData(topLeftX, topLeftY, width, height).data;
    // console.log(imageData);
    for (i=0; i<imageData.length; i+=4){
      //console.log(i, imageData[i]);
      // iterate throught the array reading rgb(a) and determining colour.
      if(imageData[i]<100 && imageData[i+1]<100 && imageData[i+2]>180){
        console.log("blue detected !!!!");
        return false;
      }else{
        return true;
      };
    };
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



