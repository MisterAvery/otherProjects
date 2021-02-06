class Apple {
  constructor() {
    this.x = Math.floor(Math.random() * cols) * scale;
    this.y = Math.floor(Math.random() * rows) * scale;
  }
  
  draw() {
    ctx.fillStyle = '#f00';
    ctx.fillRect(this.x, this.y, scale, scale);
  }
  
  getNewLoc() {
    this.x = Math.floor(Math.random() * cols) * scale;
    this.y = Math.floor(Math.random() * rows) * scale;
  }
}