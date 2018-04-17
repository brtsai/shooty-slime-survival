import Entity from '../entity';

class BlackBackground extends Entity {
  constructor() {
    super();
  }

  init (ctx) {
  }

  show (ctx) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);  
    ctx.fill();
  }
}

export default BlackBackground;
