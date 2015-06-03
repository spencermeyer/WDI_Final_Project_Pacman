document.addEventListener('DOMContentLoaded', function () {

    if(document.getElementById("canvas") !==null){
        console.log("can see canvas")
    canvas      = document.getElementById("canvas");

// THIS IS THE CODE THAT RUNS ONLY ON START UP
initializeLibrary();
begginingSound();

// THIS FUNCTION IS FOR REPETITIVE EXECUTION HERE
function myTimer() {
    // console.log("the timer function");
    clear();                //  Clear the canvas
    drawBackGroundImage();  //  Inserts image from file
    pacman();               //  This draws the pacman in the current position 
    movePacMan();           //  Moves PacMan on automatically 
    drawDots();             //  This draws the pacdots from the array
    drawPowerDots();        //  This draws the four power dots
    drawGhost();            //  This draws the ghost in the current positon
    drawGate();             //  This draws the gate across the centre housing
    drawDeath();            //  Draws "loss a life" if ghost collision detected
    moveGhostRand();        //  Sets random direction for ghost
    drawScore();            //  Draws score in top left and updates
    drawLives();            //  Draws lives in bottom and updates
  }

// Then call myVar which calls the timer containing the repetitive events
var myVar=setInterval(function () {myTimer()}, 25);
}
})



