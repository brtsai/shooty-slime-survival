import GameScene from './game_scene';
import BlackBackground from '../entities/backgrounds/black_background';

class MainScene extends GameScene {
  constructor (ctx) {
    super(ctx);

  }
 
  init () {
    const background = new BlackBackground(this.ctx);
    this.addEntity(background);
  }

  handleMouseDown (e) {
  }

  handleKeyPress (e) {
  }
}

export default MainScene;
