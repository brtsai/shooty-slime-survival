import MainScene from './scenes/main_scene';

class GameEngine {
  constructor (canvas = document.getElementById("game"), fps = 30) {
    // set member variables
    this.ctx = canvas.getContext("2d");
    this.mouseX = 0;
    this.mouseY = 0;
    this.currentScene = new MainScene(ctx);

    // bind functions to this
    this.tick = this.tick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    // setup game tick and mouse/key listeners
    window.setInterval(this.tick, 1000/fps);
    canvas.addEventListener("mousedown", this.handleMouseDown);
    canvas.addEventListener("mouseup", this.handleMouseUp);
    canvas.addEventListener("click", this.handleClick);
    canvas.addEventListener("mousemove", this.handleMouseMove);
  }

  tick () {
    this.currentScene.run();
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
    this.mouseX = e.layerX;
    this.mouseY = e.layerY;
  }

}

export default GameEngine;
