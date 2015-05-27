var backgroundImage;
score = 0;
lives = 3;

function drawBackGroudImage(){
  MazeBackground = new Image();
  MazeBackground.src = "Pac_man_background_image_clean.png";
  return MazeBackground;
}

// THIS FUNCTION IS FOR REPETITIVE EXECUTION HERE
function myTimer() {
  // console.log("the timer function");
  clear();
  drawBackGroudImage();
  //MazeBackground.onload=function(){
  pacman();
    //drawDots();
    drawGhost();
    //drawScore();
    //drawLives();
    moveGhostRand();
  // }
}

document.addEventListener('DOMContentLoaded', function () {
  // then we load the image and do nothing until the image is loaded 
  backgroundImage = drawBackGroudImage();
  backgroundImage.onload = function(){
//    ctx.drawImage(backgroundImage,0,0,560,620);
  


  var myVar=setInterval(function () {myTimer()}, 25);

  // THIS IS THE CODE THAT RUNS ONLY ON START UP
  initializeLibrary();

  }

})

