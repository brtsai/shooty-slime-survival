import Entity from '../entity';

class BlackBackground extends Entity {
  constructor() {
    super();
  }

  init () {
    console.log('black bg init');
  }

  show (ctx) {
    console.log(ctx);
  }
}

export default BlackBackground;
