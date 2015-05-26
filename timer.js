document.addEventListener('DOMContentLoaded', function () {
  var score = 0           
  var myVar=setInterval(function () {myTimer()}, 25);

  // THIS IS THE CODE THAT RUNS ONLY ON START UP
  initializeLibrary();

  // THIS FUNCTION IS FOR REPETITIVE EXECUTION HERE
  function myTimer() {
    // console.log("the timer function");
    clear();
    drawBackGroudImage();
    pacman();
    drawDots();
    drawEnemy();

  }   
})

