import GameScene from './game_scene';
import BlackBackground from '../entities/backgrounds/black_background';

class MainScene extends GameScene {
  constructor (ctx) {
    super(ctx);

  }
 
  init () {
    const background = new BlackBackground();
    console.log(this);
    this.addEntity(background);
    console.log(this.entities);
  }

  handleMouseDown (e) {
  }

  handleKeyPress (e) {
  }
}

export default MainScene;
