import MainScene from './scenes/main_scene';

class GameEngine {
  constructor (canvas = document.getElementById("game"), fps = 30, InitialScene = MainScene) {
    // set member variables
    this.ctx = canvas.getContext('2d');
    this.currentScene = new InitialScene(this.ctx);

    // bind functions to this
    this.tick = this.tick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    // setup game tick and mouse/key listeners
    window.setInterval(this.tick, 1000/fps);
    canvas.addEventListener("mousedown", this.handleMouseDown);
    canvas.addEventListener("mouseup", this.handleMouseUp);
    canvas.addEventListener("click", this.handleClick);
    canvas.addEventListener("mousemove", this.handleMouseMove);
    canvas.addEventListener("keydown", this.handleKeyDown);
    canvas.addEventListener("keyup", this.handleKeyUp);
  }

  tick () {
    this.currentScene.onTick();
  }

  handleMouseDown (e) {
    if (this.currentScene.handleMouseDown === undefined) return;
    this.currentScene.handleMouseDown(e);
  }

  handleMouseUp (e) {
    if (this.currentScene.handleMouseUp === undefined) return;
    this.currentScene.handleMouseUp(e);
  }

  handleClick (e) {
    if (this.currentScene.handleMouseClick === undefined) return;
    this.currentScene.handleMouseClick(e);
  }

  handleMouseMove(e) {
    if (this.currentScene.handleMouseMove === undefined) return;
    this.currentScene.handleMouseMove(e);
    
  }

  handleKeyDown(e) {
    if (this.currentScene.handleKeyDown === undefined) return;
    this.currentScene.handleKeyDown(e);
  }

  handleKeyUp(e) {
    if (this.currentScene.handleKeyUp === undefined) return;
    this.currentScene.handleKeyUp(e);
  }
}

export default GameEngine;
