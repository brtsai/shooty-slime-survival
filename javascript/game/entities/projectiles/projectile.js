import Entity from '../entity';

class Projectile extends Entity {
  constructor (velocity = 0, x = 0, y = 0, orientation = 0) {
    super(x, y, orientation);
    this.radius = 2;
    this.velocity = velocity;
    
    this.move = this.move.bind(this);
  }

  init () {
  }

  show (ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(0,0,this.radius,0,2*Math.PI);
    ctx.fill();
  }

  act (ctx) {
    this.move();
  }

  move (ctx) {
    this.x += this.velocity * Math.cos(this.orientation);
    this.y += this.velocity * Math.sin(this.orientation);

    if (this.isOffScreen()) {
      console.log('should no longer render');
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
}

export default Projectile;
