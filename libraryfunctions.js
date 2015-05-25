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
  MazeBackground.src = "Pac_man_background_image_clean.png";
  ctx.drawImage(MazeBackground,0,0,560,620);
}
function drawBackground(){
  // only rounds the joins if the line with is really big
  ctx.lineJoin = "round";
  ctx.lineWidth = 3;
  ctx.strokeRect(160,140,20,140);
  ctx.strokeRect(180,200,80,20);
  // set compositing to erase existing drawings 
  // new drawings will erase existing drawings where the two overlap
  ctx.globalCompositeOperation='destination-out';
  // fill all rects
  // This "erases" all but the outline stroke
  ctx.fillRect(20,20,100,200);
  ctx.fillRect(90,110,75,50);
  // reset compositing to its default mode
  ctx.globalCompositeOperation='source-over';
}
function drawRects(){
  for (i=0; i<pacRects.length; i++){
    ctx.strokeStyle = '#00008F';
    ctx.lineWidth = 3;
    ctx.strokeRect(pacRects[i][0],pacRects[i][1],pacRects[i][2],pacRects[i][3]);
    ctx.closePath;
  }
}
function mirrorDown(){
  ctx.setTransform(1,1,0,1,0,500);
}
function pacman(){
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.arc(x,y,8,ang1,ang2,pacwise);
  ctx.lineTo(x,y);
  ctx.fillStyle="yellow";
  ctx.fill();
  ctx.closePath;
}
function drawDots(){
  for (i=0; i<pacDots.length; i++){
    // console.log("example pacdot", pacDots[i][0], pacDots[i][1]);
    ctx.beginPath();
    ctx.arc(pacDots[i][0],pacDots[i][1],3,0,Math.PI*2);
    ctx.fillStyle="white";
    ctx.fill();
    ctx.closePath;
  }
}
function drawEnemy(){
  var enemy = new Image();
  enemy.src = "Pacman_1.png";
  ctx.drawImage(enemy,200,200,20,20);
}
function canMove(){
  var p = ctx.getImageData(x, y, 1, 1).data;
  var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
  console.log("HEX: " + hex);
}
function rgbToHex(r, g, b){
  if (r > 255 || g > 255 || b > 255)
    throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}







