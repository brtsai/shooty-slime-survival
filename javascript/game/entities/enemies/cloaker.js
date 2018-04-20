import Walker from './walker';

export const radius = 8;
export const speed = 1;

class Cloaker extends Walker {
  constructor (speed = 0, scene, x = 0, y = 0, orientation = 0) {
    super(speed, scene, x, y, orientation);
    this.radius = radius;
    this.color = 'black';
    this.outline = '#FF0000';
    this.opacity = .5;
    this.cloaking = true;
    console.log('cloaker spawned');
  }

  act () {
    this.steerToPlayer();
    this.move();
    this.cloak();
  }

  show (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alphaValue();
    ctx.arc(0,0,this.radius,0,2*Math.PI);
    ctx.fill();
    ctx.strokeStyle = this.outline;
    ctx.stroke();
  }

  cloak () {
    if (this.cloaking) {
      this.opacity -= .01;
    } else {
      this.opacity += .01;
    }
    if (this.opacity < -.25 || this.opacity >= 1) {
      this.cloaking = !this.cloaking;
    }
  }

  alphaValue () {
    if (this.opacity < .05) return .05;
    if (this.opacity > .5) return .5;
    return this.opacity;
  }

}

export default Cloaker;
