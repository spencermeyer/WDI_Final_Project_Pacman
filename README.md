# WDI_Final_Project_Pacman
A Pacman game written for my final project of WDI at General Assembly. 

by Spencer Meyer

This is work in progress that is due to be presented on Friday 5th June at General Assembly, London.

Features:

*Uses Javascript's canvas to paint the pacman, the ghosts, the score, the pacdots, the powerdots,and the number of lives left.  It refreshes every 25 milliseconds.

*Uses forward looking into the pixels in front of an object (either the pacman or the ghosts) to see if there are any blue pixels (i.e. a wall) and prevent movement forward if this is the case.  The advantage of this technique is that new background images could be quickly added and used.  There is a starting background image consisting of only a black background with blue frames.

*Draws a canvas gate across the ghost house to prevent them getting out.  After a certain score is achieved, the gate is removed and the ghosts can escape.  After a further score is achived the speed of movement of the ghosts is increased.

*Uses collision handlers to determine if a pacman has collided with either a pacdot, a powerdot or a ghost and takes the appropriate action.  It counts down lives when hit or increases the score if the pacman is invincible at the time of the collision.  Pacman is invincible for a certain time after a powerdot has been eaten.

*There is a running total of the score.  Score increases when pacdots, powerdots, and inert ghosts are eaten.

*Uses a random generator to determine the direction of the ghosts.  One of the ghosts (ghost 1, red) has a little AI in that it makes a random decision to either 1) make a random decision or 2) turn towards pacman.



