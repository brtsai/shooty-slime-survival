import GameScene from './game_scene';
import BlackBackground from '../entities/backgrounds/black_background';
import Player from '../entities/player-entities/player';

class MainScene extends GameScene {
  constructor (ctx) {
    super(ctx);
  }
 
  init () {
    const background = new BlackBackground(this.ctx);
    const player = new Player(this.ctx);
    this.addEntity(background);
    this.addEntity(player);
  }
}

export default MainScene;
