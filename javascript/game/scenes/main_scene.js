import GameScene from './game_scene';
import BlackBackground from '../entities/backgrounds/black_background';
import Player from '../entities/player-entities/player';
import Ambler from '../entities/enemies/ambler';


class MainScene extends GameScene {
  constructor (ctx, fps) {
    super(ctx, fps);
    this.count = 0;
    this.spawnRate = 2;
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

  spawnRandomAmbler () {
    console.log('spawning ambler');
    const spawningSide = Math.floor(Math.random() * 4);
  }
}

export default MainScene;
