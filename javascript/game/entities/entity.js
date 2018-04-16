class Entity {
  constructor (x = 0, y = 0, orientation = 0, scale = 1) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.scale = scale;

    this.bindFunctions();
  }

  bindFunctions () {
    this.onTick = this.onTick.bind(this);
  }

  onTick () {

  }

  render (ctx) {
    
  }

}

export default Entity;
