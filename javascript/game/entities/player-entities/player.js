import Entity from '../entity';
import Projectile from '../projectiles/projectile';

class Player extends Entity {
  constructor () {
    super();
    this.radius = 10;
    this.x = 100;
    this.y = 100;
    this.moveSpeed = 3;
    this.wIsPressed = false;
    this.aIsPressed = false;
    this.sIsPressed = false;
    this.dIsPressed = false;
    this.mouseIsPressed = false;

    this.firingRate = 6;
    this.firingTick = 0;
  }

  init () {
    console.log('player init');
  }

  show (ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(0,0,this.radius,0,2*Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect(-2, -10, 4, 10);
    ctx.fill();
  }

  act (ctx) {
    this.move();
    this.shoot();
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
    if (this.mouseIsPressed === true && this.firingTick === 0) {
      console.log('pew');
      console.log(this.scene);
      const p = new Projectile(5, this.x, this.y, this.orientation - Math.PI/2);
      console.log(p);
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
    console.log('player mouse down');
    this.mouseIsPressed = true;
  }

  handleMouseUp (e) {
    console.log('player mouse up');
    this.mouseIsPressed = false;
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
}

export default Player;
