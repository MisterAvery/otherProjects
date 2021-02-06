class Platform {
  constructor(yPos = Math.floor(Math.random() * (canvas.height - 12)), xPos = Math.floor(Math.random() * (canvas.width - 100))) {
    this.w = 100;
    this.h = 15;
    this.x = xPos;
    this.y = yPos;
  }
  
  draw() {
    ctx.fillStyle = '#f1f1f1';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}