import Entity from '../entity';

class BlackBackground extends Entity {
  constructor() {
    super();
  }

  init (ctx) {
  }

  show (ctx) {
    console.log(ctx);

ctx.beginPath();
ctx.lineWidth = "6";
ctx.strokeStyle = "red";
ctx.rect(5, 5, 290, 140);  
ctx.stroke();

  }
}

export default BlackBackground;
