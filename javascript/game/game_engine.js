import MainScene from './scenes/main_scene';

class GameEngine {
  constructor (canvas = document.getElementById("game"), fps = 30, scenes = [MainScene]) {
    this.bindFunctions();

    // set member variables
    this.ctx = canvas.getContext('2d');
    this.fps = fps;
    this.scenes = scenes;
    this.currentScene = new scenes[0](this.ctx, this.fps, this.endCurrentScene);
    this.sceneIndex = 0;
    

    // setup game tick and mouse/key listeners
    window.setInterval(this.tick, 1000/fps);
    canvas.addEventListener("mousedown", this.handleMouseDown);
    canvas.addEventListener("mouseup", this.handleMouseUp);
    canvas.addEventListener("click", this.handleClick);
    canvas.addEventListener("mousemove", this.handleMouseMove);
    canvas.addEventListener("keydown", this.handleKeyDown);
    canvas.addEventListener("keyup", this.handleKeyUp);
  }

  bindFunctions () {
    // bind functions to this
    this.endCurrentScene = this.endCurrentScene.bind(this);
    this.tick = this.tick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  endCurrentScene () {
    this.transitionToNextScene();
  }
  
  transitionToNextScene () {
    this.sceneIndex++;
    if (this.sceneIndex >= this.scenes.length) {
      this.sceneIndex = 0;
    }
    this.currentScene = new this.scenes[this.sceneIndex] (this.ctx, this.fps, this.endCurrentScene);
  }

  tick () {
    this.currentScene.onTick();
    this.checkCollisions();
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
    e.preventDefault();
  }

  handleKeyUp(e) {
    if (this.currentScene.handleKeyUp === undefined) return;
    this.currentScene.handleKeyUp(e);
    e.preventDefault();
  }

  checkCollisions () {
    const collidables = [];
    this.currentScene.eachEntity (entity => collidables.push(entity));
    for (let leftIndex = 0; leftIndex < collidables.length; leftIndex++) {
      for (let rightIndex = leftIndex + 1; rightIndex < collidables.length; rightIndex ++) {
        const left = collidables[leftIndex];
        const right = collidables[rightIndex];
        if (left.collidesWith(right)) {
          left.receiveCollisionFrom(right);
          right.receiveCollisionFrom(left);
        }
      }
    }
  }
}

export default GameEngine;
