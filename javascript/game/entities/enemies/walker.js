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
  }

  act () {
    this.steerToPlayer();
    this.move();
  }

  steerToPlayer () {
    const playerX = this.scene.player.x;
    const playerY = this.scene.player.y;
    const xDiff = playerX - this.x;
    const yDiff = playerY - this.y;

    const orientationToPlayer = Math.atan(yDiff/xDiff) + (xDiff < 0 ? Math.PI : 0);
    this.orientation = orientationToPlayer;
  }

}

export default Walker;
