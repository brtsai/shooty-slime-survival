import Ambler from './ambler';

export const radius = 8;
export const speed = 1;
class Chaser extends Ambler {
  constructor (speed = 0, scene, x = 0, y = 0, orientation = 0) {
    super(speed, scene, x, y, orientation);
    this.speed = speed;
    this.radius = radius;
    this.color = '#1c15d8';
    this.outline = 'red';

    this.xMomentum = 0;
    this.yMomentum = 0;

    this.velocity = .1;
    this.turnRadius = 2;
    this.type = 'enemy';
  }

  act () {
    this.move();
  }

  move () {
    this.x += this.xMomentum;
    this.y += this.yMomentum;
    
    const xDiff = this.scene.player.x - this.x;
    const yDiff = this.scene.player.y - this.y;
    const orientationToPlayer = Math.atan(yDiff/xDiff) + (xDiff < 0 ? Math.PI : 0);

    this.xMomentum += Math.cos(orientationToPlayer) * this.velocity/this.scene.fps;
    this.yMomentum += Math.sin(orientationToPlayer) * this.velocity/this.scene.fps;

    if (this.velocity < this.fps/10) this.velocity += .01;

    if (this.isOffScreen()) this.shouldRender = false;
  }

  receiveCollisionFrom (otherEntity) {
    switch (otherEntity.type) {
      case 'projectile':
        this.shouldRender = false;
        break;

      case 'enemy':
        this.x -= this.xMomentum;
        this.y -= this.yMomentum;
        this.xMomentum /= -2;
        this.yMomentum /= -2;

        break;

      default:

    }
  }

}

export default Chaser;
