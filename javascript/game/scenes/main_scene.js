import GameScene from './game_scene';
import BlackBackground from '../entities/backgrounds/black_background';
import Player from '../entities/player-entities/player';

class MainScene extends GameScene {
  constructor (ctx, fps) {
    super(ctx, fps);
  }
 
  init () {
    const background = new BlackBackground(this);
    const player = new Player(this);
    this.addEntity(background);
    this.addEntity(player);
  }
}

export default MainScene;
