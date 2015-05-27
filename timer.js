document.addEventListener('DOMContentLoaded', function () {
// THIS IS THE CODE THAT RUNS ONLY ON START UP
initializeLibrary();

// drawBackGroundImage();
// backgroundImage = drawBackGroundImage();
// backgroundImage.onload = function(){
  // canvas = document.getElementById("canvas");
  // ctx = canvas.getContext("2d");
  // ctx.drawImage(this,0,0); 
// }

// THIS FUNCTION IS FOR REPETITIVE EXECUTION HERE
function myTimer() {
    // console.log("the timer function");
    clear();
    drawBackGroundImage();
    // backgroundImage.onload = function(){
    //   console.log("this is background image loaded");
    pacman();  
    //console.log("just run pacman");
    drawDots();
    drawGhost();
    //console.log("just ran drawGost");
    moveGhostRand();
    //console.log("just ran moveGhostRand");
    drawScore();
    drawLives();
    
    // 
  // }
  }

// Then call myVar which calls the timer containing the repetitive events
var myVar=setInterval(function () {myTimer()}, 25);
})



