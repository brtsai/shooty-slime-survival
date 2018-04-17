class GameScene {
  constructor (ctx) {
    this.ctx = ctx;
    this.bindFunctions();
    this.entities = [];

    this.init()
  }

  bindFunctions() {
    this.init = this.init.bind(this);
    this.onTick = this.onTick.bind(this);
    this.run = this.run.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  init () {
  }

  onTick () {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].onTick();
    }
    this.run();
  }

  run () {
  }

  handleMouseDown (e) {
  }
  
  handleMouseUp (e) {
  }
  
  handleMouseClick (e) {
  }

  handleKeyPress (e) {
  }
}

export default GameScene;
