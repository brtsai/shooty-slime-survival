import GameScene from './game_scene';
import BlackBackground from '../entities/backgrounds/black_background';
import Player from '../entities/player-entities/player';
import Ambler from '../entities/enemies/ambler';


class MainScene extends GameScene {
  constructor (ctx, fps) {
    super(ctx, fps);
    this.count = 0;
    this.spawnRate = 1;

  }
 
  init () {
    const background = new BlackBackground(this);
    const player = new Player(this);
    this.addEntity(background);
    this.addEntity(player);
  }

  run () {
    if (this.count >= (60/this.fps) * (60/this.spawnRate)) {
      this.spawnRandomAmbler();
      this.count = 0;
    }

    this.count++;
  }

  randomInt (max) {
    return Math.floor(Math.random() * max);
  }

  spawnRandomAmbler () {
    const spawningSide = this.randomInt(4);
    let x = this.randomInt(this.ctx.canvas.width);
    let y = this.randomInt(this.ctx.canvas.height);
    let orientation = Math.random() * Math.PI/2 - Math.PI/4;
    
    switch(spawningSide) {
      case 0:
        y = 0 - 2 * Ambler.radius;
        orientation += Math.PI/2;
        break;

      case 1:
        x = this.ctx.canvas.width + 2 * Ambler.radius
        orientation += Math.PI;
        break;

      case 2:
        y = this.ctx.canvas.height + 2 * Ambler.radius
        orientation -= Math.PI/2;
        break;

      case 3:
        x = 0 - 2 * Ambler.radius;
        break;

      default:
        console.log('error');
        break;
    }
    const a = new Ambler(Ambler.speed, this, x, y, orientation);
    this.addEntity(a);
  }
}

export default MainScene;
