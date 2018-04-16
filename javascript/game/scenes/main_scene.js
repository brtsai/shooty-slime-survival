import GameScene from './game_scene';

class MainScene extends GameScene {
  constructor (ctx) {
    super(ctx);
  }
  
  handleMouseDown (e) {
    console.log('main scene handle mouse down');
  }
}

export default MainScene;
