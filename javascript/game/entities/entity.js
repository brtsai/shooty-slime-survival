class Entity {
  constructor (x = 0, y = 0, orientation = 0, hScale = 1, vScale = 1, hSkew = 0, vSkew = 0) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.hScale = hScale;
    this.vScale = vScale;
    this.hSkew = hSkew;
    this.vSkew = vSkew;
    this.shouldRender = true;

    this.bindFunctions();
    this.init();
  }

  bindFunctions () {
    this.setScene = this.setScene.bind(this);
    this.onTick = this.onTick.bind(this);
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
    this.show = this.show.bind(this);
    this.act = this.act.bind(this);
  }

  setScene (scene) {
    this.scene = scene;
  }

  onTick (ctx) {
    this.render(ctx);
    this.act();
  }

  init (ctx) {
  }

  render (ctx) {
    ctx.save();
    
    ctx.transform(this.hScale, this.hSkew, this.vSkew, this.vScale, this.x, this.y);
    ctx.rotate(this.orientation);
    this.show(ctx);

    ctx.restore();
  }

  show (ctx) {
    
  }

  act () {

  }

}

export default Entity;
