# [shooty-slime-survival](https://brtsai.github.io/shooty-slime-survival/)

## Overview

Shooty Slime Survival is a browser based action survival shooter game wherein you play as a shooty slime trying to survive a harsh world filled with ouchy enemies!

![gameplay](https://github.com/brtsai/shooty-slime-survival/blob/master/documentation/assets/usage/game.gif)

## Technologies/External Resources

* HTML5 Canvas for drawing, rendering the game
* HTML, CSS for everything else on the page
* Gimp for sprites/character models
* Fontawesome for footer glyphicons

## Project Goals

#### For the game
* Have users control the shooty slime using WASD + Mouse to move and shoot
* The shooty slime should be able to move around withinthe canvas and shoot
* There should be enemies that come from off screen to fight the shooty slime
* There should be hitbox detection for shooty bullets and ouchy enemies
* Be fun!!!

#### For the webpage
* Have a canvas element which renders the game view
* Have the game title as well as instructions
* Have an "About the Developer" section as a footer

## Fun Facts

Did you know that walkers (big green blobs) actually "steer" towards the player?
That's right! They have a turn radius, and turn either left or right if they aren't already facing you.
How do they know whether to turn left or right?
It takes its current orientation vector, and dots that with a vector perpendicular to the direction the
player's in.
If the resulting dot product is greater than 0, that means that the vector to the player has some
component in the clockwise direction of the walker's orientation, and it should turn right!

```javascript
shouldTurnRight (player) {
  const xDiff = player.x - this.x;
  const yDiff = player.y - this.y;

  const perpendicularDot = Math.cos(this.orientation) * yDiff - Math.sin(this.orientation) * xDiff;

  return perpendicularDot > 0;
}
```

## Project Schedule

#### Day 1
* Setup the basic page layout
* Hit all of the "For the webpage" goals
* Implement the basic shooty slime model and controls

#### Day 2
* Implement shooting
* Implement amblers, walkers, sprinter enemies
* Implement hitbox detection for collisions between game entities
* Implement more interesting enemies

#### Day 3
* Begin styling sprites
* Move fast and break things implementing more interesting enemies
* Maybe implement bosses and powerups

#### Day 4
* Implement sprites and sound

#### Stretch Goals
* Implement character progression
* Implement environmental doodads
