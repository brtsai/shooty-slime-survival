import Ambler from './ambler';

export const radius = 15;
export const speed = 1;
class Walker extends Ambler {
  constructor (speed = 0, scene, x = 0, y = 0, orientation = 0) {
    super(speed, scene, x, y, orientation);
    this.speed = speed;
    this.radius = radius;
    this.color = '#1cb235';
    this.outline = 'red';
    
    this.turnRadius = 2;
    this.type = 'enemy';
    console.log(`created walker with x ${x} y ${y} rientation ${orientation}`);
  }

  act () {
    this.steerToPlayer();
    this.move();
  }

  normaliseAngle (angle) {
    while (angle < 0 || angle >= 2 * Math.PI ) {
      if (angle < 0) angle += 2 * Math.PI;
      if (angle >= 2 * Math.PI) angle -= 2 * Math.PI;
    }
  }

  steerToPlayer () {
    console.log('steering walker to player');
    const playerX = this.scene.player.x;
    const playerY = this.scene.player.y;
    const xDiff = playerX - this.x;
    const yDiff = playerY - this.y;

    if (xDiff === 0) {
      
    }

    const orientationToPlayer = Math.atan(yDiff/xDiff) + (xDiff < 0 ? Math.PI : 0);

    const orientationDiff = orientationToPlayer - this.orientation;
    
    if (Math.abs(orientationDiff) < this.turnRadius * Math.PI/180) {
      console.log('orientation diff within turn radius');
      this.orientation = orientationToPlayer;
    } else {
      console.log(`orientationDiff: ${orientationDiff} orientation: ${this.orientation}`);
      this.orientation += (this.shouldTurnRight(this.scene.player) ? 1 : -1) * this.turnRadius * Math.PI/180;
    }
    
    if (this.orientation > 2*Math.PI) {
      this.orientation -= 2 * Math.PI;
    }
    if (this.orientation < -2 * Math.PI) {
      this.orientation += 2 * Math.PI;
    }
  }

  shouldTurnRight (player) {
    const xDiff = player.x - this.x;
    const yDiff = player.y - this.y;

    const orientationDotPerpendicularOfOrientationToPlayer = Math.cos(this.orientation) * yDiff - Math.sin(this.orientation) * xDiff;

    return orientationDotPerpendicularOfOrientationToPlayer > 0;
  }


}

export default Walker;
