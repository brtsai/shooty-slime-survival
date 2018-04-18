import Entity from '../entity';
import Projectile from '../projectiles/projectile';

let attackImage = new Image();
attackImage.src = './assets/blob_attack.png';
let idleImage = new Image();
idleImage.src = './assets/blob_idle.png';

class Player extends Entity {
  constructor (scene, x = 250, y = 250, orientation = 0) {
    super(scene, x, y, orientation);
    this.radius = 10;
    this.moveSpeed = this.fps/40;
    this.wIsPressed = false;
    this.aIsPressed = false;
    this.sIsPressed = false;
    this.dIsPressed = false;
    this.mouseIsPressed = false;

    this.type = 'player';
    this.firingRate = 1024/this.fps;
    this.firingTick = 0;
    
    this.animationCoord = 0;
    this.animationClock = 0;
    this.animationImage = idleImage;
  }

  init () {
  }

  show (ctx) {
    /**
    ctx.beginPath();
    ctx.fillStyle = '#2246f9';
    ctx.arc(0,0,this.radius,0,2*Math.PI);
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = '#bf9c20';
    ctx.arc(0,0,this.radius/2,0,2*Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect(-2, -10, 4, 10);
    ctx.fill();
    **/


    ctx.rotate(Math.PI/2);
    ctx.drawImage(this.animationImage,this.animationCoord, 0, 80, 80, -32, -33, 60, 60);
    this.animationClock++;
  }

  animate () {
    if (this.animationClock % 2 * this.fps/60 === 0) {
      this.animationCoord += 80;
    }
    if (this.mouseIsPressed === true) {
      if (this.animationCoord >= 800) this.animationCoord = 0;
    } else {
      if (this.animationCoord >= 640) this.animationCoord = 0;
    }
  }

  act (ctx) {
    this.move();
    this.shoot();
    this.animate();
  }

  move () {
    if (this.wIsPressed) {
      this.y-= this.moveSpeed;
    }
    if (this.sIsPressed) {
      this.y+= this.moveSpeed;
    }
    if (this.aIsPressed) {
      this.x-= this.moveSpeed;
    }
    if (this.dIsPressed) {
      this.x+= this.moveSpeed;
    }
  }

  shoot () {
    if (this.mouseIsPressed === true && this.firingTick <= 0) {
      const xDist = Math.sin(this.orientation) * (this.radius + Projectile.radius + 1)
      const yDist = Math.cos(this.orientation) * (this.radius + Projectile.radius + 1)
      const p = new Projectile(this.fps/15, this.scene, this.x + xDist, this.y - yDist, this.orientation - Math.PI/2);
      this.scene.addEntity(p);
      this.firingTick = this.firingRate;
    }

    if (this.firingTick > 0) this.firingTick--;
  }

  handleMouseMove (e) {
    this.face(e.layerX, e.layerY)
  }

  face (x, y) {
    const xDiff = x - this.x;
    const yDiff = y - this.y;
    this.orientation = Math.atan(yDiff/xDiff) + Math.PI/2;
    if (xDiff < 0) this.orientation += Math.PI;
  }

  handleMouseDown (e) {
    this.mouseIsPressed = true;
    this.animationClock = 0;
    this.animationImage = attackImage;
  }

  handleMouseUp (e) {
    this.mouseIsPressed = false;
    this.animationClock = 0;
    this.animationImage = idleImage;
  }

  handleKeyDown (e) {
    switch (e.key) {
      case "W":
      case "w":
        this.wIsPressed = true;
        break;
      
      case "A":
      case "a":
        this.aIsPressed = true;
        break;

      case "S":
      case "s":
        this.sIsPressed = true;
        break;

      case "D":
      case "d":
        this.dIsPressed = true;
        break;

      default:
        
        break;
    }
  }
  
  handleKeyUp (e) {
    switch (e.key) {
      case "W":
      case "w":
        this.wIsPressed = false;
        break;
      
      case "A":
      case "a":
        this.aIsPressed = false;
        break;

      case "S":
      case "s":
        this.sIsPressed = false;
        break;

      case "D":
      case "d":
        this.dIsPressed = false;
        break;

      default:
        
        break;
    }
  }

  receiveCollisionFrom (otherEntity) {
    console.log('player collision');
    this.shouldRender = false;
  }
}

export default Player;
