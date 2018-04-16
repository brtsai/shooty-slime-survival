class GameEngine {
  constructor (canvas = document.getElementById("game"), fps = 30) {
    this.ctx = canvas.getContext("2d");
    this.mouseX = 0;
    this.mouseY = 0;

    this.tick = this.tick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);


    window.setInterval(this.tick, 1000/fps);
    canvas.addEventListener("click", this.handleClick);
    canvas.addEventListener("mousemove", this.handleMouseMove);
  }

  tick () {
  }

  handleClick (e) {
    console.log('click event');
    console.log(e);
  }

  handleMouseMove(e) {
    console.log(e);
    this.mouseX = e.layerX;
    this.mouseY = e.layerY;
  }

}

export default GameEngine;
