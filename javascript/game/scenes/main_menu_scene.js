import GameScene from './game_scene';
import BlackBackground from '../entities/backgrounds/black_background';
import Button from '../entities/ui-elements/button';

class MainMenuScene extends GameScene {
  constructor (ctx, fps, endScene) {
    super(ctx, fps, endScene);
    this.count = 0;
  }

  init () {
    this.addEntity(new BlackBackground(this));
    let playButton = new Button (this, 250, 250, 0, 200, 80, "Play", '#ef3e6c', 48, 'Helvetica', '#1a68b0', '#2f7b2f', '#ded6d8', 5, this.endScene);
    this.addEntity(playButton);
  }

  run () {
    
  }
}

export default MainMenuScene;
