class Entity {
  constructor (scene, x = 0, y = 0, orientation = 0, hScale = 1, vScale = 1, hSkew = 0, vSkew = 0) {
    this.scene = scene;
    this.fps = this.scene.fps;
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.hScale = hScale;
    this.vScale = vScale;
    this.hSkew = hSkew;
    this.vSkew = vSkew;
    this.shouldRender = true;
    this.collisionType = 'circular';
    this.init();
  }

  setScene (scene) {
    this.scene = scene;
    this.fps = scene.fps;
  }

  onTick (ctx) {
    this.render(ctx);
    this.act(ctx);
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

  act (ctx) {

  }

  collidesWith (otherEntity ) {
    switch (this.collisionType) {
      case 'circular':
        switch (otherEntity.collisionType) {
          case 'circular':
            return this.checkCircularToCircularCollision (this, otherEntity);

          default:
            return false;
        }
        break;

      default:
        return false;
        break;
    }
  }

  checkCircularToCircularCollision (entityOne, entityTwo) {
    const xVector = entityTwo.x - this.x;
    const yVector = entityTwo.y - this.y;

    const distance = Math.sqrt(xVector * xVector + yVector * yVector);
    const radii = entityOne.radius + entityTwo.radius;

    return distance <= radii;
  }

  receiveCollisionFrom (otherEntity) {

  }
}

export default Entity;
