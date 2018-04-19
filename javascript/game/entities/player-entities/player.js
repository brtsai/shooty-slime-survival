import Entity from '../entity';
import Projectile from '../projectiles/projectile';

const attackImage = new Image();
attackImage.src = './assets/blob_attack.png';
const idleImage = new Image();
idleImage.src = './assets/blob_idle.png';
const deathImage = new Image();
deathImage.src = './assets/blob_death.png';

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
    this.animationState = 'idle';
    this.animationFrameWidth = 80;
    this.animationLength = 8;
    this.notInTerminalAnimation = true;
  }

  init () {
  }

  showAbstract (ctx) {
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
  }

  show (ctx) {
    ctx.rotate(Math.PI/2);
    ctx.drawImage(this.animationImage(),this.animationCoord, 0, 80, 80, -32, -33, 60, 60);
    this.animationClock++;
  }

  animationImage() {
    switch (this.animationState) {
      case 'idle':
        return idleImage;

      case 'attack':
        return attackImage;
      
      case 'death':
        return deathImage;

      default:
        return idleImage;
    }
  }

  setAnimationState(state, frameWidth, animationLength) {
    if (this.notInTerminalAnimation) {
      this.animationCoord = 0;
      this.animationClock = 0;
      this.animationFrameWidth = frameWidth;
      this.animationLength = animationLength;
      this.animationState = state;
    }
  }

  enterTerminalAnimationState(state, frameWidth, animationLength) {
    this.setAnimationState(state, frameWidth, animationLength);
    this.notInTerminalAnimation = false;
  }

  animate () {
    if (this.animationClock % 3 === 0) {
      this.animationCoord += this.animationFrameWidth;
    }
    if (this.animationCoord >= this.animationLength * this.animationFrameWidth) {
      this.animationCoord = 0;
      if (!this.notInTerminalAnimation) this.shouldRender = false;
    }
  }

  act (ctx) {
    if (this.notInTerminalAnimation) {
      this.move();
      this.shoot();
    }
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
    if (this.notInTerminalAnimation) this.face(e.layerX, e.layerY)
  }

  face (x, y) {
    const xDiff = x - this.x;
    const yDiff = y - this.y;
    this.orientation = Math.atan(yDiff/xDiff) + Math.PI/2;
    if (xDiff < 0) this.orientation += Math.PI;
  }

  handleMouseDown (e) {
    this.mouseIsPressed = true;
    this.setAnimationState('attack', 80, 10);
  }

  handleMouseUp (e) {
    this.mouseIsPressed = false;
    this.setAnimationState('idle', 80, 8);
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
    if (this.notInTerminalAnimation) {
      const xDiff = otherEntity.x - this.x;
      const yDiff = otherEntity.y - this.y;
      const orientationToEntity = Math.atan(yDiff/xDiff) + (xDiff < 0 ? Math.PI : 0);
      this.orientation = orientationToEntity + Math.PI;
      this.enterTerminalAnimationState('death', 80, 8)
    }
  }
}

export default Player;
