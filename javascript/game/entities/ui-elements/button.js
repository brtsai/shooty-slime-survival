import Entity from '../entity';

class Button extends Entity {
  constructor (scene, x, y, orientation, width, height, text, fontFill, fontSize, font, fill, hoverFill, stroke, strokeWeight, action) {
    super(scene, x, y, orientation);
    this.width = width;
    this.height = height;
    this.text = text;
    this.fontFill = fontFill;
    this.fontSize = fontSize;
    this.font = font;
    this.fill = fill;
    this.hoverFill = hoverFill;
    this.stroke = stroke;
    this.strokeWeight = strokeWeight;
    this.action = action;

    this.mouseX = -10;
    this.mouseY = -10;
  }

  show (ctx) {
    // draw rectangle button with outline
    ctx.fillStyle = this.mouseHover() ? this.hoverFill : this.fill;
    ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
    ctx.rect(-this.width/2, -this.height/2, this.width, this.height);
    ctx.strokeStyle = this.stroke;
    ctx.strokeWeight = this.strokeWeight;
    ctx.stroke();

    ctx.font = `${this.fontSize}px ${this.font}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.fontFill;
    ctx.fillText(this.text, 0, 0);
  }

  act () {

  }

  mouseHover () {
    if (this.mouseX < this.x - this.width/2 || this.mouseX > this.x + this.width/2) return false;
    if (this.mouseY < this.y - this.height/2 || this.mouseY > this.y + this.height/2) return false;
    return true;
  }

  handleMouseMove (e) {
    this.mouseX = e.layerX;
    this.mouseY = e.layerY;
  }

  handleMouseDown (e) {
    if (this.mouseHover()) {
      this.action();
    }
  }
}

export default Button;
