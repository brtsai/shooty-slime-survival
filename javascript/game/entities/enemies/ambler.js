import Entity from '../entity';

class Ambler extends Entity {
  constructor (x = 0, y = 0, orientation = 0, speed = 0) {
    super(x, y, orientation);
    
  }

  show (ctx) {
    
  }

  move () {
    this.x += this.velocity * Math.cos(this.orientation);
    this.y += this.velocity * Math.sin(this.orientation);

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
}

export default Ambler;
