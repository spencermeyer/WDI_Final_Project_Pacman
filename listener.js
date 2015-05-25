var increment = 1;
var score = 0;
direction = "right";

document.addEventListener('DOMContentLoaded', function () {
  console.log ("start of Javascript doc loaded")
  
  document.onkeydown=function(){
    //console.log("a key pressed")
    var keyThatWasPressed= (String.fromCharCode(event.keyCode || event.charCode));
    //console.log (keyThatWasPressed)
    switch(keyThatWasPressed){
      case("%"):
        //console.log("left was pressed");
        ang1 = 0.75 *Math.PI;
        ang2 = 1.25 *Math.PI;
        pacwise = true;
        direction = "left";
        canMove(direction);
        x = x - increment;
        break;
      case("'"):
        //console.log("right was pressed");
        ang1 = 0.25*Math.PI;
        ang2 = 1.75*Math.PI;
        pacwise = false;
        direction = "right";
        x=x+increment;
        break;
      case("&"):
        //console.log("up was pressed");
        ang1 = 1.25*Math.PI;
        ang2 = 1.75*Math.PI;
        pacwise  = true;
        direction = "up";
        y=y-increment;
        break;
      case("("):
        //console.log("down was pressed");
        ang1 = 0.75*Math.PI;
        ang2 = 2.25*Math.PI;
        pacwise = false;
        direction = "down";
        y=y+increment;
        break;
      case(" "):
        //console.log("space was pressed");
        break;
      }
    }

  });

