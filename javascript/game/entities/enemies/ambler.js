import Entity from '../entity';

export const radius = 10;
export const speed = 1;
class Ambler extends Entity {
  constructor (speed = 0, scene, x = 0, y = 0, orientation = 0) {
    super(scene, x, y, orientation);
    this.speed = speed;
    this.radius = radius;
  }

  show (ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#28d347';
    ctx.arc(0,0,this.radius,0,2*Math.PI);
    ctx.fill();
  }
  
  act () {
    this.move();
  }
  
  move () {
    this.x += this.speed * Math.cos(this.orientation);
    this.y += this.speed * Math.sin(this.orientation);

    if (this.isOffScreen()) {
      console.log('ambler off screen');
      this.shouldRender = false;
    }
  }

  isOffScreen () {
    if (this.x < 0 - 3 * this.radius) return true;
    if (this.y < 0 - 3 * this.radius) return true;
    if (this.x > this.scene.ctx.canvas.width + 3 * this.radius) return true;
    if (this.y > this.scene.ctx.canvas.height + 3 * this.radius) return true;
    return false;
  }

  static get radius () {
    return radius;
  }

  static get speed () {
    return speed;
  }
}

export default Ambler;
