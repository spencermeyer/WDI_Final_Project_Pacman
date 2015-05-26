document.addEventListener('DOMContentLoaded', function () {
  score = 0;
  lives = 3;
  var myVar=setInterval(function () {myTimer()}, 25);

  // THIS IS THE CODE THAT RUNS ONLY ON START UP
  initializeLibrary();

  // THIS FUNCTION IS FOR REPETITIVE EXECUTION HERE
  function myTimer() {
    // console.log("the timer function");
    clear();
    drawBackGroudImage();
    //MazeBackground.onload=function(){
      pacman();
      drawDots();
      drawGhost();
      drawScore();
      drawLives();
      moveGhostRand();
    // }
  }   
})

