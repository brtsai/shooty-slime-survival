import Entity from '../entity';

export const radius = 10;
export const speed = 1;
class Ambler extends Entity {
  constructor (speed = 0, scene, x = 0, y = 0, orientation = 0) {
    super(scene, x, y, orientation);
    this.speed = speed;
    this.radius = radius;
    this.color = '#28d347';
    this.outline = 'red';

    this.type = 'enemy';
  }

  show (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(0,0,this.radius,0,2*Math.PI);
    ctx.fill();
    ctx.strokeStyle = this.outline;
    ctx.stroke();
  }
  
  act () {
    this.move();
  }
  
  move () {
    this.x += this.speed * Math.cos(this.orientation);
    this.y += this.speed * Math.sin(this.orientation);

    if (this.isOffScreen()) {
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

  receiveCollisionFrom (otherEntity) {
    switch (otherEntity.type) {
      case 'projectile':
        this.shouldRender = false;
        break;
      
      case 'enemy':
        this.orientation += Math.PI;
        break;

      default:

    }
  }
}

export default Ambler;
