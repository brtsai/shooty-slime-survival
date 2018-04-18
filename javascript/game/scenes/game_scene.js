class GameScene {
  constructor (ctx, fps) {
    this.ctx = ctx;
    this.fps = fps;
    this.bindFunctions();
    this.entities = {};
    this.doodads = {};
    this.nextId = 0;

    this.init()
  }

  bindFunctions() {
    this.init = this.init.bind(this);
    this.eachEntity = this.eachEntity.bind(this);
    this.onTick = this.onTick.bind(this);
    this.run = this.run.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.addEntity = this.addEntity.bind(this);
    this.getNextId = this.getNextId.bind(this);
  }

  init () {
  }

  eachEntity (fn) {
    const entityKeys = Object.keys(this.entities);
    for (let i = 0; i < entityKeys.length; i++) {
      const key = entityKeys[i];
      fn(this.entities[key]);
      if (this.entities[key].shouldRender === false) delete this.entities[key];
    }
  }

  onTick () {
    this.eachEntity(entity => {
      entity.onTick(this.ctx);
    });
    this.run();
  }

  addEntity (entity) {
    const entityId = this.getNextId();
    this.entities[entityId] = entity;
    entity.setScene(this);
    return entityId;
  }

  getNextId () {
    return this.nextId++;
  }

  run () {
  }
  
  handleMouseMove (e) {
    this.eachEntity(entity => {
      if (entity.handleMouseMove === undefined) return;
      entity.handleMouseMove(e);
    });
  }

  handleMouseDown (e) {
    this.eachEntity(entity => {
      if (entity.handleMouseDown === undefined) return;
      entity.handleMouseDown(e);
    });
  }
  
  handleMouseUp (e) {
    this.eachEntity(entity => {
      if (entity.handleMouseUp === undefined) return;
      entity.handleMouseUp(e);
    });
  }
  
  handleMouseClick (e) {
    this.eachEntity(entity => {
      if (entity.handleMouseClick === undefined) return;
      entity.handleMouseClick(e);
    });
  }

  handleKeyDown (e) {
    this.eachEntity(entity => {
      if (entity.handleKeyDown === undefined) return;
      entity.handleKeyDown(e);
    });
  }
  
  handleKeyUp (e) {
    this.eachEntity(entity => {
      if (entity.handleKeyUp === undefined) return;
      entity.handleKeyUp(e);
    });
  }
}

export default GameScene;
